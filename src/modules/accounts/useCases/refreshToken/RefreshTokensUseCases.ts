import authConfig from "@config/authConfig";
import { IUserTokensRepository } from "@modules/accounts/repositories/interfaces/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}
@injectable()
export class RefreshTokensUseCases {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider
  ) {}
  public async execute(token: string): Promise<string> {
    const { email, sub } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;
    const user_id = sub;
    // garantindo que existe userid e o token
    const userTokens = await this.userTokensRepository.findByIdAndToken(
      user_id,
      token
    );
    if (!userTokens) {
      throw new AppError(
        `Não foi encontrado nenhum token com o numero ${userTokens}`,
        404
      );
    }
    // deletamos o token encontrado para add um novo
    await this.userTokensRepository.deleteById(userTokens.id);
    const refresh_token_expires = this.dateProvider.addDays(
      authConfig.expires_refreshtoken_in_days
    );
    const refreshToken = sign({ email }, authConfig.secret_refresh_token, {
      subject: sub,
      expiresIn: authConfig.secret_tokenrefresh_expires_in,
    });
    await this.userTokensRepository.create({
      expires_date: refresh_token_expires,
      refresh_token: refreshToken,
      user_id: user_id,
    });
    return refreshToken;
  }
}

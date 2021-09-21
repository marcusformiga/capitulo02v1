import authConfig from "@config/authConfig";
import { IUserTokensRepository } from "@modules/accounts/repositories/interfaces/IUserTokensRepository";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
export class CreateSessionsUseCases {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider
  ) {}
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email ou password estão incorretos", 401);
    }
    const passwordIsCorrect = await compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new AppError("Email ou password estão incorretos", 401);
    }
    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.token_expires_in,
    });
    const refreshToken = sign({ email }, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.secret_tokenrefresh_expires_in,
    });
    const refresh_token_expires = this.dateProvider.addDays(
      authConfig.expires_refreshtoken_in_days
    );
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires,
      user_id: user.id,
      refresh_token: refreshToken,
    });
    const tokenReturn: IResponse = {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/interfaces/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
  token: string;
  newPassword: string;
}

@injectable()
export class ResetPasswordUseCases {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  public async execute({ token, newPassword }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError(`Token não encontrado`, 404);
    }
    // verificar se o token está expirado
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expirado");
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("O usuario não existe", 404);
    }
    user.password = await hash(newPassword, 10);
    await this.usersRepository.create(user);
    await this.userTokensRepository.deleteById(userToken.id);
  }
}

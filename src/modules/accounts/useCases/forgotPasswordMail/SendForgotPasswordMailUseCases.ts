import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/interfaces/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import { IMailProvider } from "@shared/providers/Mail/IMailProvider";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class SendForgotPasswordMailUseCases {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}
  public async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(
        `Usuário com o email ${email} não foi encontrado`,
        404
      );
    }
    const token = uuidv4();
    const expires_date = this.dateProvider.addHours(3);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      `O link é ${token}`
    );
  }
}

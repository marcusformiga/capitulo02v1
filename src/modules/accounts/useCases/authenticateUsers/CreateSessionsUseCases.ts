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
}

@injectable()
export class CreateSessionsUseCases {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
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
    const token = sign({}, "husaehasuehaushe", {
      subject: user.id,
      expiresIn: "1d",
    });
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

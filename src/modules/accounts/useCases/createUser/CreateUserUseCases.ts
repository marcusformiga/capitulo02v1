import { ICreateUserDto } from "@modules/accounts/repositories/dto/ICreateUserDto";
import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCases {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  public async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(`Já existe um usuario com o email informado`, 409);
    }
    const hashPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      password: hashPassword,
      email,
      driver_license,
    });
  }
}

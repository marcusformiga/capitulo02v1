import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "@modules/accounts/repositories/dto/ICreateUserDto";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar,
  }: ICreateUserDto) {
    const user = this.userRepository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar,
    });
    await this.userRepository.save(user);
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(user_id);
    return user;
  }
}

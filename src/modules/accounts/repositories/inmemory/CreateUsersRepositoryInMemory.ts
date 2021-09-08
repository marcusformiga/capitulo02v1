import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDto } from "../dto/ICreateUserDto";
import { IUserRepository } from "../interfaces/IUserRepository";

export class CreateUsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];
  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });
    await this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.find((user) => user.email === email);
    return user;
  }
  async findById(user_id: string): Promise<User | undefined> {
    const user = await this.users.find((user) => user.id === user_id);
    return user;
  }
}

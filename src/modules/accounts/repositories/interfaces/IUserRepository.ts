import { ICreateUserDto } from "../dto/ICreateUserDto";
import { User } from "../../infra/typeorm/entities/User";
export interface IUserRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
}

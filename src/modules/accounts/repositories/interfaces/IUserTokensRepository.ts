import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { ICreateUserTokensDto } from "../dto/ICreateUserTokensDto";

export interface IUserTokensRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokensDto): Promise<UsersTokens>;
  findByIdAndToken(user_id: string, refreshToken: string): Promise<UsersTokens>;
  deleteById(tokenId: string): Promise<void>;
}

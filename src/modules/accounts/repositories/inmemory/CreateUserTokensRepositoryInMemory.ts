import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { ICreateUserTokensDto } from "../dto/ICreateUserTokensDto";
import { IUserTokensRepository } from "../interfaces/IUserTokensRepository";

export class CreateUserTokensRepositoryInMemory
  implements IUserTokensRepository
{
  private usersTokens: UsersTokens[] = [];
  public async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokensDto): Promise<UsersTokens> {
    const userToken = new UsersTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.usersTokens.push(userToken);
    return userToken;
  }
  public async findByIdAndToken(
    user_id: string,
    refreshToken: string
  ): Promise<UsersTokens> {
    const user = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refreshToken
    );
    return user;
  }
  public async deleteById(tokenId: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === tokenId);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  public async findByRefreshToken(token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find((ut) => ut.refresh_token === token);
    return userToken;
  }
}

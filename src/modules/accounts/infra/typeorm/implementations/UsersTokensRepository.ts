import { ICreateUserTokensDto } from "@modules/accounts/repositories/dto/ICreateUserTokensDto";
import { IUserTokensRepository } from "@modules/accounts/repositories/interfaces/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";

export class UsersTokensRepository implements IUserTokensRepository {
  private usersTokensRepository: Repository<UsersTokens>;
  constructor() {
    this.usersTokensRepository = getRepository(UsersTokens);
  }

  public async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokensDto): Promise<UsersTokens> {
    const userToken = this.usersTokensRepository.create({
      expires_date,
      user_id,
      refresh_token,
    });
    await this.usersTokensRepository.save(userToken);
    return userToken;
  }
  public async findByIdAndToken(
    user_id: string,
    refreshToken: string
  ): Promise<UsersTokens> {
    const userTokens = await this.usersTokensRepository.findOne({
      user_id,
      refresh_token: refreshToken,
    });
    return userTokens;
  }
  public async deleteById(tokenId: string): Promise<void> {
    await this.usersTokensRepository.delete(tokenId);
  }
  public async findByRefreshToken(token: string): Promise<UsersTokens> {
    const userToken = await this.usersTokensRepository.findOne({
      refresh_token: token,
    });
    return userToken;
  }
}

import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/deleteFile";
import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
export class UpdateUserAvatarUseCases {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  public async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user?.avatar}`);
    }
    console.log(user);
    user.avatar = avatar_file;
    await this.userRepository.create(user);
  }
}

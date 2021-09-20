import { ICreateUserDto } from "@modules/accounts/repositories/dto/ICreateUserDto";
import { CreateUsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/CreateUsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCases } from "../createUser/CreateUserUseCases";
import { CreateSessionsUseCases } from "./CreateSessionsUseCases";

let authenticateUsersUseCases: CreateSessionsUseCases;
let createUserUseCases: CreateUserUseCases;
let createUsersRepositoryInMemory: CreateUsersRepositoryInMemory;

describe("AuthenticateUsers", () => {
  beforeEach(() => {
    createUsersRepositoryInMemory = new CreateUsersRepositoryInMemory();
    authenticateUsersUseCases = new CreateSessionsUseCases(
      createUsersRepositoryInMemory
    );
    createUserUseCases = new CreateUserUseCases(createUsersRepositoryInMemory);
  });
  it("should be able to authenticate an existent user", async () => {
    const user: ICreateUserDto = {
      name: "usertestname",
      email: "usertest@mail.com",
      driver_license: "23210cstest",
      password: "testpassword",
    };
    await createUserUseCases.execute(user);
    const authUser = await authenticateUsersUseCases.execute({
      email: user.email,
      password: user.password,
    });
    expect(authUser).toBeDefined();
    expect(authUser).toHaveProperty("token");
  });
  it("should not to be able to authenticate a no existent user", async () => {
    await expect(
      authenticateUsersUseCases.execute({
        email: "invaliduser@mail.com",
        password: "invalid",
      })
    ).rejects.toEqual(new AppError("Email ou password estão incorretos", 401));
  });
  it("should not to be able to authenticate a user with invalid password", async () => {
    const user: ICreateUserDto = {
      driver_license: "sf219test",
      email: "uservalid@mail.com",
      password: "validpassword",
      name: "validname",
    };
    await expect(
      authenticateUsersUseCases.execute({
        email: "validmail@mail.com",
        password: "invalidpassword",
      })
    ).rejects.toEqual(new AppError("Email ou password estão incorretos", 401));
  });
});

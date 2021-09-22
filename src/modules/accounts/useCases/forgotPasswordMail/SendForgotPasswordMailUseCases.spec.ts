import { CreateUsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/CreateUsersRepositoryInMemory";
import { CreateUserTokensRepositoryInMemory } from "@modules/accounts/repositories/inmemory/CreateUserTokensRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsProvider } from "@shared/providers/Date/DayJs";
import { MailProviderFake } from "@shared/providers/Mail/MailProviderFake";
import { SendForgotPasswordMailUseCases } from "./SendForgotPasswordMailUseCases";
// para enviar um email para o usuario devemos ter um usuario criado (fake)
// fazer um spy do nosso metodo sendMail do nosso repositorio fake
let sendForgotMailUseCases: SendForgotPasswordMailUseCases;
let usersRepositoryInMemory: CreateUsersRepositoryInMemory;
let dateProvider: DayjsProvider;
let userTokensRepositoryInMemory: CreateUserTokensRepositoryInMemory;
let mailProviderFake: MailProviderFake;

describe("SendForgotMail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new CreateUsersRepositoryInMemory();
    dateProvider = new DayjsProvider();
    userTokensRepositoryInMemory = new CreateUserTokensRepositoryInMemory();
    mailProviderFake = new MailProviderFake();
    sendForgotMailUseCases = new SendForgotPasswordMailUseCases(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProviderFake
    );
  });
  it("Should be able to send a email to user", async () => {
    const sendMailSpy = jest.spyOn(mailProviderFake, "sendMail");
    await usersRepositoryInMemory.create({
      name: "testname",
      driver_license: "123test",
      email: "testmail@mail.com",
      password: "test123",
    });
    await sendForgotMailUseCases.execute("testmail@mail.com");
    expect(sendMailSpy).toBeCalled();
  });
  it("Should not to be able to send a email if user does not exists", async () => {
    await expect(
      sendForgotMailUseCases.execute("invalidtest@mail.com")
    ).rejects.toEqual(
      new AppError(
        "Usuário com o email invalidtest@mail.com não foi encontrado",
        404
      )
    );
  });
  it("Should be able to create a users token", async () => {
    const createTokenEmailSpy = jest.spyOn(usersRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      name: "validtest",
      driver_license: "123rtest",
      email: "validmail@mail.com",
      password: "validpass123",
    });
    expect(createTokenEmailSpy).toHaveBeenCalled();
  });
});

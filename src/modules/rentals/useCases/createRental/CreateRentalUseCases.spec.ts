import { CreateCarRepositoryInMemory } from "@modules/cars/repositories/inmemory/CreateCarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsProvider } from "@shared/providers/Date/DayJs";
import { IDateProvider } from "@shared/providers/Date/IDateProvider";
import dayjs from "dayjs";
import { CreateRentalUseCases } from "./CreateRentalUseCases";

let createRentalUseCases: CreateRentalUseCases;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let createCarsRepositoryInMemory: CreateCarRepositoryInMemory;
let dayJsDateProvider: IDateProvider;
describe("CreateRentalUseCases", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayJsDateProvider = new DayjsProvider();
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    createCarsRepositoryInMemory = new CreateCarRepositoryInMemory();
    createRentalUseCases = new CreateRentalUseCases(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      createCarsRepositoryInMemory
    );
  });
  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCases.execute({
      car_id: "2323",
      user_id: "123",
      return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not to be able to register a new rental for a same user if this user already rental a car", async () => {
    expect(async () => {
      await createRentalUseCases.execute({
        car_id: "2321",
        user_id: "1234",
        return_date: dayAdd24Hours,
      });
      await createRentalUseCases.execute({
        car_id: "2322",
        user_id: "1234",
        return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not to be able to rental a car if this car already loan", async () => {
    expect(async () => {
      await createRentalUseCases.execute({
        car_id: "2211",
        user_id: "12345",
        return_date: dayAdd24Hours,
      });
      await createRentalUseCases.execute({
        car_id: "2211",
        user_id: "123456",
        return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not to be able to rental a car if time of return less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCases.execute({
        car_id: "validid123",
        user_id: "validuserid123",
        return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

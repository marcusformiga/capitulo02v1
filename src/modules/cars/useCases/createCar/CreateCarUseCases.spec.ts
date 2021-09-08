import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";

import { CreateCarRepositoryInMemory } from "../../repositories/inmemory/CreateCarRepositoryInMemory";
import { CreateCarUseCases } from "./CreateCarUseCases";

let createCarUseCases: CreateCarUseCases;
let carRepositoryInMemory: CreateCarRepositoryInMemory;
describe("Create Car", () => {
  beforeAll(() => {
    carRepositoryInMemory = new CreateCarRepositoryInMemory();
    createCarUseCases = new CreateCarUseCases(carRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    await createCarUseCases.execute({
      name: "name test",
      description: "description test",
      brand: "brand test",
      category_id: "category test",
      fine_amount: 120,
      license_plate: "KGB-0109",
      dayly_rate: 150,
    });
  });
  it("should not to be able to create 2 cars with same license plate", async () => {
    expect(async () => {
      await createCarUseCases.execute({
        name: "car1",
        description: "description test",
        brand: "brand test",
        category_id: "category test",
        fine_amount: 120,
        license_plate: "KGB-0102",
        dayly_rate: 150,
      });
      await createCarUseCases.execute({
        name: "car2",
        description: "description test2",
        brand: "brand test2",
        category_id: "category test2",
        fine_amount: 120,
        license_plate: "KGB-0102",
        dayly_rate: 150,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should create a car with avaliable by default", async () => {
    const car = await createCarUseCases.execute({
      name: "test car",
      description: "test description",
      brand: "test brand",
      category_id: "test category",
      dayly_rate: 120,
      fine_amount: 220,
      license_plate: "HFDS-2121",
    });
    expect(car.is_avaliable).toBe(true);
    expect(car).toHaveProperty("is_avaliable");
  });
});

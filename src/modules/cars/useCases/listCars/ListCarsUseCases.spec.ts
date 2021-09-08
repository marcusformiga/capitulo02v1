import { CreateCarRepositoryInMemory } from "@modules/cars/repositories/inmemory/CreateCarRepositoryInMemory";
import { ListCarsUseCases } from "./ListCarsUseCases";

let listCarsUseCases: ListCarsUseCases;
let carRepositoryInMemory: CreateCarRepositoryInMemory;

describe("ListCarsAvaliable", () => {
  beforeAll(() => {
    carRepositoryInMemory = new CreateCarRepositoryInMemory();
    listCarsUseCases = new ListCarsUseCases(carRepositoryInMemory);
  });
  it("should be able to list all cars avaliable", async () => {
    const newCar = await carRepositoryInMemory.create({
      name: "carname",
      description: "cardescription",
      license_plate: "kgb-0902",
      fine_amount: 150,
      is_avaliable: true,
      brand: "brandname",
      category_id: "category",
      dayly_rate: 220,
    });
    const carsAvaliable = await listCarsUseCases.execute({});

    expect(carsAvaliable).toBeDefined();
    expect(carsAvaliable).toBeInstanceOf(Object);
  });
  it("should be able to list all cars by brand", async () => {
    const newCar = await carRepositoryInMemory.create({
      name: "cartestname",
      description: "cartestdescription",
      license_plate: "test-0901",
      fine_amount: 130,
      is_avaliable: true,
      brand: "testbrand",
      category_id: "category",
      dayly_rate: 220,
    });
    const car = await listCarsUseCases.execute({ brand: "testbrand" });
    expect(car).toBeDefined();
    expect(car).toBeTruthy();
  });
  it("should to be able to list all cars by name", async () => {
    const newCar = await carRepositoryInMemory.create({
      name: "cartestname",
      description: "cartestdescription",
      license_plate: "test1-plate",
      fine_amount: 110,
      is_avaliable: true,
      brand: "testbrand",
      category_id: "category12",
      dayly_rate: 220,
    });
    const car = await listCarsUseCases.execute({ name: "cartestname" });
    expect(car).toBeDefined();
    expect(car).toEqual(car);
  });
});

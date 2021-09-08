import { IUserRepository } from "@modules/accounts/repositories/interfaces/IUserRepository";
import { UserRepository } from "@modules/accounts/repositories/UserRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/implementations/CarImagesRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/implementations/CarRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/implementations/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/implementations/SpecificationRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/interfaces/ICarImagesRepository";
import { ICarRepository } from "@modules/cars/repositories/interfaces/ICarRepository";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/ISpecificationRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/implementations/RentalRepository";
import { IRentalRepository } from "@modules/rentals/repositories/interfaces/IRentalRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

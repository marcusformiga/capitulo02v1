import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRental/ListRentalController";

export const rentalsRouter = Router();
const createRentalsController = new CreateRentalController();
const devolutionRentalsController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post("/", ensureAuthenticated, createRentalsController.handle);
rentalsRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalsController.handle
);
rentalsRouter.get("/", ensureAuthenticated, listRentalsByUserController.handle);

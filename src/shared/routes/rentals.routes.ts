import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

export const rentalsRouter = Router();
const createRentalsController = new CreateRentalController();

rentalsRouter.post("/", ensureAuthenticated, createRentalsController.handle);

import { Request, Response, Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificatioController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
export const specificationRouter = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
  "/",
  ensureAuthenticated,
  createSpecificationController.handle
);

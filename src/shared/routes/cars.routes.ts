import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../middlewares/ensureAdmin";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import uploadConfig from "../../config/upload";
import multer from "multer";
import { UploadCarsImagesController } from "@modules/cars/useCases/uploadImages/UploadCarsImagesController";

export const carRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const uploadImageCar = multer(uploadConfig.upload("./tmp/cars"));
const uploadImagesCarController = new UploadCarsImagesController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carRoutes.get("/avaliable", listCarsController.handle);
carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadImageCar.array("images"),
  uploadImagesCarController.handle
);

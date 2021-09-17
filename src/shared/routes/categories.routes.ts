import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategory/ListCategoryController";
import { ensureAdmin } from "../../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";

export const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();
const upload = multer({
  dest: "./temp",
});

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);
categoriesRoutes.get("/", ensureAuthenticated, listCategoryController.handle);

import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import multer from "multer";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUsersAvatar/UpdateUserAvatarController";
import uploadConfig from "../../config/upload";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../middlewares/ensureAdmin";
export const usersRouter = Router();
const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const upload = multer({
  dest: "./avatar",
});
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRouter.post("/", createUsersController.handle);
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  ensureAdmin,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

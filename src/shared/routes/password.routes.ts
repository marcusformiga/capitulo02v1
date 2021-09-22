import { Router } from "express";
import { SendForgotPasswordController } from "@modules/accounts/useCases/forgotPasswordMail/SendForgotPasswordController";
import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";

export const passwordRouter = Router();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", sendForgotPasswordController.handle);
passwordRouter.post("/reset", resetPasswordController.handle);

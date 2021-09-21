import { Router } from "express";
import { SendForgotPasswordController } from "@modules/accounts/useCases/forgotPasswordMail/SendForgotPasswordController";

export const passwordRouter = Router();
const sendForgotPasswordController = new SendForgotPasswordController();

passwordRouter.post("/forgot", sendForgotPasswordController.handle);

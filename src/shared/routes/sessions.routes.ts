import { Router } from "express";
import { CreateSessionsController } from "@modules/accounts/useCases/authenticateUsers/CreateSessionsController";
export const sessionsRouter = Router();
const createSessionsController = new CreateSessionsController();

sessionsRouter.post("/sessions", createSessionsController.handle);

import { Router } from "express";
import { CreateSessionsController } from "@modules/accounts/useCases/authenticateUsers/CreateSessionsController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokensController";
export const sessionsRouter = Router();
const createSessionsController = new CreateSessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post("/sessions", createSessionsController.handle);
sessionsRouter.post("/refresh-token", refreshTokenController.handle);

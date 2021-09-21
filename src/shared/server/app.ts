import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { categoriesRoutes } from "../routes/categories.routes";
import { specificationRouter } from "../routes/specifications.routes";
import "../container/index";
import "../providers/index";
import { usersRouter } from "../routes/users.routes";
import { sessionsRouter } from "@shared/routes/sessions.routes";
import { AppError } from "../errors/AppError";
import { carRoutes } from "@shared/routes/cars.routes";
import { rentalsRouter } from "@shared/routes/rentals.routes";
import createConnection from "../../database/index";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger.json";
import { passwordRouter } from "@shared/routes/password.routes";
const app = express();
const port = 3001;

createConnection();
app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRouter);
app.use("/users", usersRouter);
app.use("/cars", carRoutes);
app.use("/rentals", rentalsRouter);
app.use("/password", passwordRouter);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(sessionsRouter);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
app.get("/", (request, response) => {
  return response.json({ message: "Rota de teste" });
});

export { app };

import fs from "fs";
import { AppError } from "../shared/errors/AppError";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    throw new AppError(err);
  }
  await fs.promises.unlink(filename);
};

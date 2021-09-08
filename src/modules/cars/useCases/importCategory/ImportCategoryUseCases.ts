import fs from "fs";
import csvparse from "csv-parse";

import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/ICategoryRepository";

@injectable()
export class ImportCategoryUseCases {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  public execute(file: any) {
    const stream = fs.createReadStream(file.path);
    const parseFile = csvparse();
    stream.pipe(parseFile);
    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

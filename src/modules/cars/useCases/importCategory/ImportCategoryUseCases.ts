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
  public execute(file: Express.Multer.File) {
    // permite fazer a leitura do arquivo em partes
    const stream = fs.createReadStream(file.path);
    const parseFile = csvparse();
    // envia pedaços do nosso arquivo para um lugar que desejamos
    stream.pipe(parseFile);
    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

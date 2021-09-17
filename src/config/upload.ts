import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export default {
  // recebemos uma pasta folder e fica a cargo de quem esta fazendo o upload dizer o nome da pasta
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          // criar um hash com o nome do arquivo para evitar arquivos com nomes duplicados
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.filename}`;
          return callback(null, fileName);
        },
      }),
    };
  },
};

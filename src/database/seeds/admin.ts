import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const hashedPassword = await hash("admin", 8);
  await connection.query(
    `INSERT INTO USERS(id,name,email, password, "is_admin", created_at, driver_license)
        values('${id}','admin2', 'admin2@rent.com.br', '${hashedPassword}', true, 'now()', 'abc0801')
        `
  );
}

create()
  .then(() => {
    console.log("Usuário administrador foi criado com sucesso");
  })
  .catch((err) => {
    console.log(err);
  });

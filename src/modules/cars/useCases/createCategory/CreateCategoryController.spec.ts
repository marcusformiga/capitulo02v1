import request from "supertest";
import { app } from "@shared/server/app";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../database/index";

// pegar a conexao
// criar usuario admin
// rodar as migrations antes de cada teste no banco de dados de testes
// fechar conexao com o banco fake
let connection: Connection;
describe("CreateCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
    const id = uuidV4();
    const hashedPassword = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id,name,email, password, "is_admin", created_at, driver_license)
        values('${id}','admin', 'admin2@rent.com.br', '${hashedPassword}', true, 'now()', 'abc0801')
        `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new categorie", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin2@rent.com.br",
      password: "admin",
    });
    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "testname",
        description: "testdescription",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });
  it("should not to be able to register 2 categories with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin2@rent.com.br",
      password: "admin",
    });
    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "testname",
        description: "testdescription",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(400);
  });
});

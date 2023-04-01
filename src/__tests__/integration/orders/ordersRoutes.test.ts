import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdm,
  mockedCustomer,
  mockedOrder,
  mockedProduct,
  mockedUser,
  userAdmLogin,
  userLogin,
} from "../../mocks/";
import { Customers } from "../../../entities/customers.entity";

describe("/orders", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await connection
      .createQueryBuilder()
      .insert()
      .into(Customers)
      .values({ cpf: "00000", name: "Cliente Padrão" })
      .execute();

    await request(app).post("/users").send(mockedAdm);
    await request(app).post("/users").send(mockedUser);
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const productResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedProduct);

    mockedOrder.products[0] = { id: productResponse.body.id, count: 1 };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /orders - should be able create a new order", async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);

    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedOrder);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("employees");
    expect(response.body).toHaveProperty("order_has_products");
    expect(response.body).toHaveProperty("customers");
    expect(response.body).toHaveProperty("payment");
    expect(response.status).toBe(201);
  });

  it("POST /orders - should be able to subtract the quantity of products sold", async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);

    const productResponse = await request(app)
      .get(`/products/${mockedOrder.products[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedOrder);

    const productGetResponse = await request(app)
      .get(`/products/${mockedOrder.products[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    await request(app)
      .delete(`/orders/${response.body.id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(productGetResponse.body.quantity).toBeLessThan(productResponse.body.quantity);
  });

  it("GET /orders - Should be able to list all orders", async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);

    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  it("GET /orders - Should not be able to list without authorization", async () => {
    const response = await request(app).get("/orders");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /orders/customer/:id - Should be able to list all orders of a specific customer", async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);

    const response = await request(app)
      .get(`/orders/customer/${mockedCustomer.cpf}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("created_at");
    expect(response.body[0]).toHaveProperty("total");
    expect(response.body[0]).toHaveProperty("order_has_products");
    expect(response.body[0]).toHaveProperty("customers");
    expect(response.body[0]).toHaveProperty("payment");
    expect(response.status).toBe(200);
  });

  it("DELETE /orders/:id - Should be able to delete a order", async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);

    const orderResponse = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedOrder);

    const response = await request(app)
      .delete(`/orders/${orderResponse.body.id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  it("DELETE /orders/:id - Should not be able to delete a order without admin authorization", async () => {
    const userLoginResponse = await request(app).post("/login").send(userLogin);

    const orderResponse = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedOrder);

    const response = await request(app)
      .delete(`/orders/${orderResponse.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});

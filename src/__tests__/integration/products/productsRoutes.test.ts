import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedProduct, mockedAdm, userAdmLogin, mockedCustomer, userLogin } from "../../mocks";

describe("/products", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});

		await request(app).post("/products").send(mockedProduct);
		await request(app).post("/users").send(mockedAdm);
		await request(app).post("/login").send(userAdmLogin);
		await request(app).post("/users").send(mockedCustomer);
		await request(app).post("/login").send(userLogin);
	});

	test("POST /products - Must be able to create a product. Only by administrators.", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).post("/products").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProduct);

		expect(response.body).toHaveProperty("name");
		expect(response.status).toBe(201);
	});

	test("POST /products -  should not be able to create a product that already exists", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).post("/products").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProduct);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(400);
	});

	test("POST /products -  should not be able to create products not being admin", async () => {
		const userLoginResponse = await request(app).post("/login").send(userLogin);
		const response = await request(app).post("/products").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedProduct);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /products -  should not be able to create a product without authentication", async () => {
		const response = await request(app).post("/products").send(mockedProduct);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /products -  should not be able to create a product without a name", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).post("/products").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send({ ...mockedProduct, name: "" });

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(400);
	});

	test("GET /products -  should be able to list all products", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).get("/products").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("products");
		expect(response.status).toBe(200);
	});

	test("GET /products/:id -  should be able to list a product by id", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).get("/products/1").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);	

		expect(response.body).toHaveProperty("name");
		expect(response.status).toBe(200);
	});

	test("GET /products/:id -  should not be able to list a product with invalid id", async () => {
		const response = await request(app).get("/products/999");

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH /products/:id -  should not be able to update a product without authentication", async () => {
		const response = await request(app).patch("/products/1").send({ name: "New Name" });

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH /products/:id -  should not be able to update a product without being admin", async () => {
		const userLoginResponse = await request(app).post("/login").send(userLogin);
		const response = await request(app).patch("/products/1").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send({ name: "New Name" });

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /products/:id -  should not be able to delete a product without authentication", async () => {
		const response = await request(app).delete("/products/1");

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /products/:id -  should not be able to delete a product without being admin", async () => {
		const userLoginResponse = await request(app).post("/login").send(userLogin);
		const response = await request(app).delete("/products/1").set("Authorization", `Bearer ${userLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /products/:id -  should not be able to delete a product with invalid id", async () => {
		const adminLoginResponse = await request(app).post("/login").send(userAdmLogin);
		const response = await request(app).delete("/products/999").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	afterAll(async () => {
		await connection.destroy();
	});
});

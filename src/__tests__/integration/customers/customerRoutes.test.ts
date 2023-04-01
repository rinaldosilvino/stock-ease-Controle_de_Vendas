import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedAdm, userAdmLogin, mockedCustomer, userLogin } from "../../mocks";

describe("/customer", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdm)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /customers - Should be able to create customer",async () => {

        const admLoginResponse = await request(app).post("/login").send(userAdmLogin)

        const response = await request(app).post('/customers').set("Authorization", `Bearer ${admLoginResponse.body.token}`).send(mockedCustomer)

        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("name")
        expect(response.status).toBe(201)
     
    })

    test("POST /customers - Should not be able to create customer that already exists",async () => {

        const admLoginResponse = await request(app).post("/login").send(userAdmLogin)

        const response = await request(app).post('/customers').set("Authorization", `Bearer ${admLoginResponse.body.token}`).send(mockedCustomer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("POST /customers - Should not be able to create customer without authentication",async () => {

        const response = await request(app).post('/customers').send(mockedCustomer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /customers - Should not be able to list customers not being admin",async () => {

        const userLoginResponse = await request(app).post("/login").send(userLogin);
        const response = await request(app).post('/customers').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedCustomer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("GET /customers - Should be able to list all customers",async () => {

        const admLoginResponse = await request(app).post("/login").send(userAdmLogin)

        const response = await request(app).get('/customers').set("Authorization", `Bearer ${admLoginResponse.body.token}`)

        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

    test("GET /customers -  should not be able to list customers without authentication",async () => {

        const response = await request(app).get('/customers')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /customers - Should not be able to list customers not being admin",async () => {

        const userLoginResponse = await request(app).post("/login").send(userLogin)

        const response = await request(app).get('/customers').set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })


    test("PATCH /customers/:id -  Should be able to update user",async () => {

        const newValues = {name: "Test Update"}

        const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
        const token = `Bearer ${admLoginResponse.body.token}`

        const getCustomer = await request(app).get("/customers").set("Authorization", token)
        const getCustomerId = getCustomer.body[0].cpf

        const response = await request(app).patch(`/customers/${getCustomerId}`).set("Authorization",token).send(newValues)
        const customerUpdated = await request(app).get("/customers").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(customerUpdated.body[0]).toHaveProperty("name")
        expect(customerUpdated.body[0]).toHaveProperty("cpf")
        expect(response.status).toBe(200)
      })

    test("PATCH /customers/:id - Only admin should be able to update",async () => {
        const newValues = {name: "Update"}

        const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
        
        const getCustomer = await request(app).get("/customers").set("Authorization", `Bearer ${admLoginResponse.body.token}`)
        console.log(getCustomer)
        const getCustomerId = getCustomer.body[0].cpf

        const response = await request(app).patch(`/customers/${getCustomerId}`).set("Authorization", `Bearer ${admLoginResponse.body.token}`).send(newValues)

        expect(response.status).toBe(200)
    })

})    
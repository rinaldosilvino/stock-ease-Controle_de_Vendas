import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAdm, mockedUser, userAdmLogin, userLogin } from "../../mocks/";

describe("/users", () => {
    let connection: DataSource
    beforeAll(async () => {
        await AppDataSource.initialize()
          .then((res) => {
            connection = res;
          })
          .catch((err) => {
            console.error("Error during Data Source initialization", err);
          });
    })
    
    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /users - Should be able create a new user",async () => {

        const response = await request(app).post('/users').send(mockedUser)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("is_active")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.is_active).toEqual(true)
        expect(response.status).toBe(201)
    })

    test("POST /users - Should not be able to create a user that already exists",async () => {
        const response = await request(app).post('/users').send(mockedUser)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /users - Should be able to list all orders",async () => {
      await request(app).post('/users').send(mockedAdm)
      const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
      const response = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      expect(response.body).toHaveLength(2)
      expect(response.status).toBe(200)
    })
    
    test("GET /users - Should not be able to list users without authentication",async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
    })

  test("GET /users - Should not be able to list users not being admin",async () => {
    const userLoginResponse = await request(app).post("/login").send(userLogin);
    const response = await request(app).get('/users').set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)
  })
  test("DELETE /users/:id - Should be able to delete user",async () => {
    await request(app).post('/users').send(mockedAdm)
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const getUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const response = await request(app).delete(`/users/${getUser.body[0].id}`).set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const findUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    expect(response.status).toBe(204)
    expect(findUser.body[0].isActive).toBe(false)
  })
  test("DELETE /users/:id - Should not be able to delete user without authentication",async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const getUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const response = await request(app).delete(`/users/${getUser.body[0].id}`)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })
  test("DELETE /users/:id - Should not be able to delete user not being admin",async () => {
    const userLoginResponse = await request(app).post("/login").send(userLogin);
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const getUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const response = await request(app).delete(`/users/${getUser.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)
  })
  test("DELETE /users/:id - Shouldn't be able to delete user with isActive = false",async () => {
    await request(app).post('/users').send(mockedAdm)
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const getUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const response = await request(app).delete(`/users/${getUser.body[0].id}`).set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })
  test("DELETE - Should not be able to delete user with invalid id",async () => {
    await request(app).post('/users').send(mockedAdm)
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const response = await request(app).delete(`/users/155550456`).set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })
  test("PATCH /users/:id -  Should be able to update user",async () => {
    const newValues = {name: "Test Update", email: "testUpdate@email.com"}
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const token = `Bearer ${admLoginResponse.body.token}`
    const getUser = await request(app).get("/users").set("Authorization", token)
    const getUserId = getUser.body[0].id
    const response = await request(app).patch(`/users/${getUserId}`).set("Authorization",token).send(newValues)
    const userUpdated = await request(app).get("/users").set("Authorization", token)
    expect(response.status).toBe(200)
    expect(userUpdated.body[0]).not.toHaveProperty("password")
  })
  test("PATCH /users/:id - Should not be able to update user without authentication",async () => {
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const getUser = await request(app).get('/users').set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    const response = await request(app).patch(`/users/${getUser.body[0].id}`)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })
  test("PATCH /users/:id - Should not be able to update user with invalid id",async () => {
    const newValues = {name: "Test Update", email: "testUpdate@email.com"}
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const token = `Bearer ${admLoginResponse.body.token}`
    const getUser= await request(app).get("/users").set("Authorization", token)
    const getUserId = getUser.body[0].id
    const response = await request(app).patch(`/users/155550456`).set("Authorization",token).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(404)
  })
  test("PATCH /users/:id - Only Adm should be able to update isAdm value",async () => {
    const newValue = {isAdm: false}
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const token = `Bearer ${admLoginResponse.body.token}`
    const getUser= await request(app).get("/users").set("Authorization", token)
    console.log(getUser)
    const getUserId = getUser.body[0].id
    const response = await request(app).patch(`/users/${getUserId}`).set("Authorization",token).send(newValue)
    expect(response.status).toBe(200)
  })
  test("PATCH /users/:id - Should not be able to update isActive field value",async () => {
    const newValue = {isActive: false}
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const token = `Bearer ${admLoginResponse.body.token}`
    const getUser = await request(app).get("/users").set("Authorization", token)
    const getUserId = getUser.body[0].id
    const response = await request(app).patch(`/users/${getUserId}`).set("Authorization",token).send(newValue)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })
  test("PATCH /users/:id - Should not be able to update id field value",async () => {
    const newValue = {id: false}
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const token = `Bearer ${admLoginResponse.body.token}`
    const getUser = await request(app).get("/users").set("Authorization", token)
    const getUserId = getUser.body[0].id
    const response = await request(app).patch(`/users/${getUserId}`).set("Authorization",token).send(newValue)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })
  test("PATCH /users/:id - Should not be able to update another user without adm permission",async () => {
    const newValue = {isActive: false}
    const userLoginResponse = await request(app).post("/login").send(mockedUser);
    const admLoginResponse = await request(app).post("/login").send(userAdmLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`
    const adminToken = `Bearer ${admLoginResponse.body.token}`
    const getUser = await request(app).get("/users").set("Authorization", adminToken)
    const getUserId = getUser.body[1].id
    const response = await request(app).patch(`/users/${getUserId}`).set("Authorization",userToken).send(newValue)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })
  
})
import supertest from "supertest";
import {web} from "../src/application/web";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {
  
    afterEach(async () => {
        await UserTest.delete();
    });

    it('should reject regsiter new user if request is invalid', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: ""
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    });

    it('should register new user', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "mahadi",
                password: "rahasia",
                name: "Mahadi Dwi Nugraha"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("mahadi");
        expect(response.body.data.name).toBe("Mahadi Dwi Nugraha");

    });

    

})



describe('POST /api/users/login', () => {
  
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        
    });

    it('should be able to login', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "mahadi",
                password: "rahasia"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("mahadi");
        expect(response.body.data.name).toBe("Mahadi Dwi Nugraha");
        expect(response.body.data.token).toBeDefined();
    });

    it('should reject login user if username wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "mahasdadi",
                password: "rahasia"
            });

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject login user if password wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "mahadi",
                password: "rahasasfa"
            });

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        
    });

    it('should be able to get user', async () => {
        const response = await supertest(web)
                        .get("/api/users/current")
                        .set("Authorization", "test");

        console.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("mahadi");
        expect(response.body.data.name).toBe("Mahadi Dwi Nugraha");

    });

    it('should reject get user if token is invalid', async () => {
        const response = await supertest(web)
                        .get("/api/users/current")
                        .set("Authorization", "salah");

        console.info(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();

    });

})


describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        
    });

    it('should reject update user if request is invalid', async () => {
        const response = await supertest(web)
                    .patch("/api/users/current")
                    .set('Authorization', 'test')
                    .send({
                        password: "",
                        name: ""
                    });

        console.info(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update user if token is wrong', async () => {
        const response = await supertest(web)
                    .patch("/api/users/current")
                    .set('Authorization', 'salah')
                    .send({
                        password: "benar",
                        name: "benar"
                    });

        console.info(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should be able to update user name', async () => {
        const response = await supertest(web)
                    .patch("/api/users/current")
                    .set('Authorization', 'test')
                    .send({
                        name: "mdn",
                    });

        console.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("mdn");
    });

    it('should be able to update user password', async () => {
        const response = await supertest(web)
                    .patch("/api/users/current")
                    .set('Authorization', 'test')
                    .send({
                        password: "benar",
                    });

        console.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("Mahadi Dwi Nugraha");

        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true);

    });

})

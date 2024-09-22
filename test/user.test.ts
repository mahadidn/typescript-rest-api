import supertest from "supertest";
import {web} from "../src/application/web";
import { UserTest } from "./test-util";

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

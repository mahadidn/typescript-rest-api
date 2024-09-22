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

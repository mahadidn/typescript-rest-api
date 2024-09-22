import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
export class UserTest {

    static async delete(){

        await prismaClient.token.deleteMany({
            where: {
                tokenUsername: "mahadi"
            }
        });

        await prismaClient.user.deleteMany({
            where: {
                username: "mahadi"
            }
        });
    }

    static async create(){

        await prismaClient.user.create({
            data: {
                username: "mahadi",
                name: "Mahadi Dwi Nugraha",
                password: await bcrypt.hash("rahasia", 10),
            }
        });

        await prismaClient.token.create({
            data: {
                token: "test",
                tokenUsername: "mahadi",
                expiresAt: new Date(Date.now() + 3600000)
            }
        })

    }

}
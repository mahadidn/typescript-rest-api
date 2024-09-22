import { User } from "@prisma/client";
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

    static async get(): Promise<User>{
        const user = await prismaClient.user.findFirst({
            where: {
                username: "mahadi"
            }
        });

        if(!user){
            throw new Error("User is not found");
        }

        return user;

    }

}
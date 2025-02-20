import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createUserRequest, LoginUserRequest, LoginUserResponse, toUserResponse, UpdateUserRequest, UpdateUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export class userService {

    static async register(request: createUserRequest): Promise<UserResponse> {

        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        });

        if(totalUserWithSameUsername != 0){
            throw new ResponseError(400, "Username already exists");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toUserResponse(user);

    }

    static async login(request: LoginUserRequest): Promise<UserResponse>{
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        });

        if(!user){
            throw new ResponseError(401, "Username or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if(!isPasswordValid){
            throw new ResponseError(401, "Username or password is wrong");
        }

        const token = await prismaClient.token.create({
            data: {
                token: uuid(),
                tokenUsername: user.username,
                expiresAt: new Date(Date.now() + 3600000)
            }
        });

        const response = toUserResponse(user);
        response.token = token.token!;

        return response;
    }

    static async get(user: LoginUserResponse): Promise<LoginUserResponse> {

        return user;

    }

    static async update(user: UpdateUserResponse, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);
        
        const dataUser: UpdateUserRequest = {

        };

        if(updateRequest.name){
            dataUser!.name = updateRequest.name;
        }

        if(updateRequest.password){
            dataUser!.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: dataUser!
        });

        return toUserResponse(result); 


    }

    static async logout(token: string): Promise<string>{
        const result = await prismaClient.token.delete({
            where: {
                token: token
            }
        });

        return "OK";

    }

}
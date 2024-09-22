import { Request, Response, NextFunction } from "express";
import { createUserRequest, LoginUserRequest, LoginUserResponse, UpdateUserRequest } from "../model/user-model";
import { userService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction){
        try {

            const request: createUserRequest = req.body as createUserRequest;
            const response = await userService.register(request);
            
            res.status(200).json({
                data: response
            });

        }catch(e){
            next(e);
        }
    }  

    static async login(req: Request, res: Response, next: NextFunction){
        try {

            const request: LoginUserRequest = req.body as createUserRequest;
            const response = await userService.login(request);
            
            res.status(200).json({
                data: response
            });

        }catch(e){
            next(e);
        }
    }  

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try {
            // const user: LoginUserResponse = {
            //     token: req.user.token,
            //     username: req.user.username,
            //     name: req.user.name
            // }
            const response = await userService.get(req.user!);
            
            res.status(200).json({
                data: response
            });

        }catch(e){
            next(e);
        }
    }  

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try {

            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response = await userService.update(req.user!, request);
            
            res.status(200).json({
                data: response
            });

        }catch(e){
            next(e);
        }
    }

}
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

    static async logout(req: UserRequest, res: Response, next: NextFunction){
        try {

            await userService.logout(req.user?.token!);
            
            res.status(200).json({
                data: "OK"
            });

        }catch(e){
            next(e);
        }
    }

}
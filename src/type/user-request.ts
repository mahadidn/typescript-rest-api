import { Request } from "express";
import { LoginUserResponse, UpdateUserResponse } from "../model/user-model";


export interface UserRequest extends Request{

    user?: LoginUserResponse;

}
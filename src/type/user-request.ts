import { Request } from "express";
import { LoginUserResponse } from "../model/user-model";


export interface UserRequest extends Request{

    user?: LoginUserResponse;

}
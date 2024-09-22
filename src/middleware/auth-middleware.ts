import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";



export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

    const token = req.get('Authorization');
    
    if(token){
        const getToken = await prismaClient.token.findFirst({
            where: {
                token: token
            },
            include: {
                user: true
            }
        });  

        
        
        if(getToken){
            req.user = {
                token: getToken.token,
                username: getToken.tokenUsername,
                name: getToken.user.name
            }
            next();
            return;
        }

    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();

}
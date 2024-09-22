import { User } from "@prisma/client";

export type UserResponse = {
    username: string;
    name: string;
    token?: string;
}

export type tokenResponse = {
    id: number;
    token: string;
    tokenUsername: string;
    createdAt: string;
    expiresAt: string;
    device?: string;
    ipAddress?: string;
    userAgent?: string;
}

export type createUserRequest = {
    username: string;
    name: string;
    password: string;
}

export type LoginUserRequest = {
    username: string;
    password: string;
}

export type LoginUserResponse = {
    username: string;
    name: string;
    token: string;
}

export type UpdateUserResponse = {
    username: string;
    name: string;
    token: string;
}

export type UpdateUserRequest = {

    name?: string;
    password?: string;
}

export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username
    }
}
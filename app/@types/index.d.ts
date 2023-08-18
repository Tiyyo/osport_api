import { NextFunction, Request, Response } from "express";

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>;

export const canals = {
    body: "body",
    params: "params",
    query: "query"
} as const

export type ChatMessage = {
    username: string,
    userId: string,
    socketId: string,
    message: string,
    date: Date,
    avatar: string,
}
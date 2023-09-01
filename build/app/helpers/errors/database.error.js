// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Prisma } from '@prisma/client';
export default class DatabaseError extends Error {
    message;
    userMessage;
    name;
    status;
    code;
    constructor(message, userTable, error) {
        super(message);
        this.userMessage = 'Internal server error';
        this.message = message;
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error);
            this.message = `Code ${error.code} : ${error.message} on ${userTable} table`;
            this.code = error.code;
            if (error.code === 'P2002') {
                this.message = `Code ${error.code} unique constraint on column "${error.meta.target[0]}" of ${userTable} table`;
                this.userMessage = 'Record already exists and can\'t be duplicated';
            }
            if (error.code === 'P2003') {
                this.message = error.message;
                this.userMessage = "You're likely trying to delete something that doesn't exist";
            }
            if (error.code === 'P2025') {
                this.message = error.meta.cause;
                this.userMessage = error.meta.cause;
            }
        }
        this.name = 'DatabaseError';
        this.status = 500;
    }
}

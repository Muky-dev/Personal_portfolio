declare namespace NodeJS
{
    export interface ProcessEnv 
    {
        NODE_ENV: "development" | "production" | "test";
        JWT_AUTH_SECRET: string;
        JWT_FORGOT_SECRET: string;
        MAIL_PROVIDER: string;
    }
}

declare namespace Express {
    export interface Request {
        user: User
    }
    export interface User {
        id?: string
    }
}
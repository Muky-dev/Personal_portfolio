declare namespace NodeJS
{
    export interface ProcessEnv 
    {
        NODE_ENV: "development" | "production" | "test";
        JWT_SECRET: string
    }
}

declare namespace Express {
    export interface Request {
        user: User
    }
    export interface User {
        id: string
    }
}
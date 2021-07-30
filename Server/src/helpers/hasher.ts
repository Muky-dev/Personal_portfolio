import { sign } from 'jsonwebtoken';

interface IMailReturn {
    mailToken: string;
    expiration: string;
}

const hashJWT = async (payload: string, jwtSecret: string): Promise<IMailReturn> => {
    try {
        const secret = jwtSecret;
        const expiration = '1h';
        const mailToken = sign({ id: payload }, secret, {
            expiresIn: expiration
        });

        return { mailToken, expiration }
    } catch (error) {
        return error
    }
}

export { hashJWT }
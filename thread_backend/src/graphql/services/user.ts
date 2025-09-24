import { prismaClient } from "../../lib/db.js";
import {createHmac, randomBytes} from 'node:crypto';
import jwt from 'jsonwebtoken';

const jwt_secret = "mewmewmew"

export interface CreateUserPayload{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GetUserTokenPayload{
    email: string,
    password: string
}

class UserService{
    public static createUser(payload: CreateUserPayload){
        const {firstName, lastName, email, password} = payload;
        const salt = randomBytes(32).toString('hex');
        const hashesPassword = createHmac('sha256', salt).update(password).digest('hex');
        return prismaClient.user.create({
            firstName,
            lastName,
            email,
            hashesPassword
        })
    }

    private static getUserByEmail(email: string){
        return prismaClient.user.findUnique({where: {email}});
    }

    private static generateHash(salt: string, password: string){
        return createHmac('sha256', salt).update(password).digest('hex');
    }

    public static getUserToken(payload: GetUserTokenPayload){
        const {email, password}  = payload;

        const user = UserService.getUserByEmail(email);
        if(!user) throw new Error('user not found');

        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);

        if(userHashPassword !== user.password){
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({id: user.id, email: user.email}, jwt_secret);
        return token
    }
}

export default UserService
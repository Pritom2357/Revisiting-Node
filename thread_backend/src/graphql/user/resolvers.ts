import UserService from "../services/user.js"
import type { CreateUserPayload } from "../services/user.js"
const queries = {
    getUserToken: async(_:any, payload: {email: string, password: string})=>{
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        });

        return token;
    },
    getCurrentLoggedInUser: async ()=>{
        return "I don't know who are u"
    }
}
const mutations = {
    createUser: async(_:any, payload: CreateUserPayload)=>{
        const res = await UserService.createUser(payload);
        return res.id;
    },
}
export const resolvers = { queries, mutations }
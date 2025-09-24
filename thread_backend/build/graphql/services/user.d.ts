export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
declare class UserService {
    static createUser(payload: CreateUserPayload): any;
    private static getUserByEmail;
    private static generateHash;
    static getUserToken(payload: GetUserTokenPayload): void;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map
import { prismaClient } from "../../lib/db.js";
import { createHmac, randomBytes } from 'node:crypto';
class UserService {
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashesPassword = createHmac('sha256', salt).update(password).digest('hex');
        return prismaClient.user.create({
            firstName,
            lastName,
            email,
            hashesPassword
        });
    }
    static getUserByEmail(email) {
        return prismaClient.user.findUnique({ where: { email } });
    }
    static generateHash(salt, password) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }
    static getUserToken(payload) {
        const { email, password } = payload;
        const user = UserService.getUserByEmail(email);
        if (!user)
            throw new Error('user not found');
        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);
        if (userHashPassword !== user.password) {
            throw new Error('Incorrect password');
        }
    }
}
export default UserService;
//# sourceMappingURL=user.js.map
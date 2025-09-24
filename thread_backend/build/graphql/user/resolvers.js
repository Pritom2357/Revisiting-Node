import UserService from "../services/user.js";
const queries = {};
const mutations = {
    createUser: async (_, payload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
};
export const resolvers = { queries, mutations };
//# sourceMappingURL=resolvers.js.map
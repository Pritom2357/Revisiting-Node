import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
import axios from 'axios';
import { prismaClient } from './lib/db.js';
async function init() {
    const app = express();
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
                say(name: String): String
            }
            type Mutation{
                createUser (firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hello!`,
                say: (_, { name }) => { return `Hey ${name}, welcome!`; }
            },
            Mutation: {
                createUser: async (__dirname, { firstName, lastName, email, password }) => {
                    await prismaClient.user.create({
                        data: {
                            email,
                            firstName,
                            lastName,
                            password,
                            salt: 'I am mew'
                        }
                    });
                    return true;
                }
            }
        }
    });
    await gqlServer.start();
    app.use(express.json());
    app.use('/graphql', expressMiddleware(gqlServer));
    app.get('/', (req, res) => {
        res.json({ message: "server is runnring" });
    });
    app.listen(8000, () => {
        console.log(`Server running at: http://localhost:8000`);
    });
}
init();
//# sourceMappingURL=index.js.map
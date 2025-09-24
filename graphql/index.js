import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';


async function startServer(params) {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User{
                id: ID
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            
            type Todo{
                id: ID
                title: String!
                completed: Boolean
                user: User
                userId: ID 
            }

            type Query{
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,
        resolvers: {
            Todo:{
                user: async(todo)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                getTodos: async ()=> (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async ()=> (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, {id})=> (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            }
        }
    });

    app.use(cors({
        origin: "*"
    }));
    app.use(bodyParser.json());

    await server.start();
    app.use('/graphql',expressMiddleware(server));

    app.listen(8000, ()=>{
        console.log(`Server started at: http://localhost:8000`);
    });
}

startServer()
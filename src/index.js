import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
const ENV_PORT = process.env.ENV_PORT;

app.use(cors());
const schema = gql`
    type Query {
        foo: User
    }

    type User {
        name: String!
    }
`;
const resolvers = {
    Query: {
        foo: () => {
            return { name: 'Britney Smith' };
        },
    },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: ENV_PORT }, () => {
  console.log(`Apollo Server on http://localhost:${ENV_PORT}/graphql`);
});

console.log('Hello Node.js project.');
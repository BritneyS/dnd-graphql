import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fetch from 'node-fetch';

const app = express();
const ENV_PORT = process.env.ENV_PORT;
const classesEndpoint = 'http://dnd5eapi.co/api/classes/';

app.use(cors());
const schema = gql`
    type Query {
        result: Result
        class: Class
        results: [Class]
    }

    type Result {
        count: Int
        results: [Class]
    }

    type Class {
        name: String
    }
`;
const resolvers = {
    Query: {
        result: () => {
            return fetch(classesEndpoint)
            .then(res => res.json());
        },
    },
    Result: {
        count: (result) => {
            return result.count;
        },
        results: (result) => {
            return Object.values(result.results);
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
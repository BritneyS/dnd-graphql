import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fetch from 'node-fetch';

const app = express();
const ENV_PORT = process.env.ENV_PORT;
const classesEndpoint = 'http://dnd5eapi.co/api/classes/';
const racesEndpoint = 'http://dnd5eapi.co/api/races/';

app.use(cors());
const schema = gql`
    type Query {
        classResult: ClassResult
        raceResult: RaceResult
    }

    type ClassResult {
        count: Int
        allClasses: [Class]
    }

    type RaceResult {
        count: Int
        allRaces: [Race]
    }

    type Class {
        name: String
    }

    type Race {
        name: String
    }
`;
const resolvers = {
    Query: {
        classResult: () => {
            return fetch(classesEndpoint)
            .then(res => res.json());
        },
        raceResult: () => {
            return fetch(racesEndpoint)
            .then(res => res.json());
        }
    },
    ClassResult: {
        count: (result) => {
            return result.count;
        },
        allClasses: (result) => {
            return Object.values(result.results);
        },
    },
    RaceResult: {
        count: (result) => {
            return result.count;
        },
        allRaces: (result) => {
            return Object.values(result.results)
        }
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
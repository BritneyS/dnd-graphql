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
            //return { name: 'Britney Smith' };
            //return fetch(classesEndpoint).then(res => res.json());
            return Object.values(data);
        },
    },
    Result: {
        count: (parent) => {
            return data.count;
        },
        results: () => {
            return Object.values(data.results);
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


let data = {
    "count": 12,
    "results": [
        {
            "name": "Barbarian",
            "url": "http://www.dnd5eapi.co/api/classes/1"
        },
        {
            "name": "Bard",
            "url": "http://www.dnd5eapi.co/api/classes/2"
        },
        {
            "name": "Cleric",
            "url": "http://www.dnd5eapi.co/api/classes/3"
        },
        {
            "name": "Druid",
            "url": "http://www.dnd5eapi.co/api/classes/4"
        },
        {
            "name": "Fighter",
            "url": "http://www.dnd5eapi.co/api/classes/5"
        },
        {
            "name": "Monk",
            "url": "http://www.dnd5eapi.co/api/classes/6"
        },
        {
            "name": "Paladin",
            "url": "http://www.dnd5eapi.co/api/classes/7"
        },
        {
            "name": "Ranger",
            "url": "http://www.dnd5eapi.co/api/classes/8"
        },
        {
            "name": "Rogue",
            "url": "http://www.dnd5eapi.co/api/classes/9"
        },
        {
            "name": "Sorcerer",
            "url": "http://www.dnd5eapi.co/api/classes/10"
        },
        {
            "name": "Warlock",
            "url": "http://www.dnd5eapi.co/api/classes/11"
        },
        {
            "name": "Wizard",
            "url": "http://www.dnd5eapi.co/api/classes/12"
        }
    ]
};

/*

Query:

{
  result {
   count
   results {
   		name
	  }
  }
}


Result:

{
  "data": {
    "result": {
      "count": 12,
      "results": [
        {
          "name": "Barbarian"
        },
        {
          "name": "Bard"
        },
        {
          "name": "Cleric"
        },
        {
          "name": "Druid"
        },
        {
          "name": "Fighter"
        },
        {
          "name": "Monk"
        },
        {
          "name": "Paladin"
        },
        {
          "name": "Ranger"
        },
        {
          "name": "Rogue"
        },
        {
          "name": "Sorcerer"
        },
        {
          "name": "Warlock"
        },
        {
          "name": "Wizard"
        }
      ]
    }
  }
}

*/
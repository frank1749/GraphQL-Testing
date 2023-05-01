import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

let clients = [
    {
        'name': 'Peter',
        'lastName': 'Parker'
    },
    {
        'name': 'Frank',
        'lastName': 'Smith'
    },
    {
        'name': 'Sarah',
        'lastName': 'Connor'
    }
];

//Custom Schema

const typeDefinitions = `
    type Query {
    clients: [Client]
    },
    type Mutation {
        addClient(name: String, lastName: String): Client
    },
    type Client{
        name: String,
        lastName: String
    }
`;
const resolvers = {
    Query: {
        clients: () => {
            return clients;
        }
    },
    Mutation: {
        addClient: ( _, data ) => {
            let newClient = {
                'name' : data.name,
                'lastName' : data.lastName
            };
            clients.push(newClient);
            return newClient;
        }
    }
};

//End Custom Schema

const yoga = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ typeDefinitions,
      resolvers: resolvers
    })
  })
  
  const server = createServer(yoga)
  
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
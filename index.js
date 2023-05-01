import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

let clients = [
    {
        'name': 'Peter'
    }
]

const yoga = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type Query {
          serverStatus: String
        }
      `,
      resolvers: {
        Query: {
            serverStatus: () => 'Working Ok!'
        }
      }
    })
  })
  
  const server = createServer(yoga)
  
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
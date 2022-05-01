import { sgtsGenerate } from './main';

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { gql } from 'apollo-server';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();
  server.applyMiddleware({ app, cors: { origin: '*', credentials: true } });

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

const typeDefs = gql`
  input Generate {
    generate: String
    output: String
    header: String
    prefix: String
    suffix: String
    endpoint: String
    codegenFunctions: Boolean
    codegenReactHooks: Boolean
    codegenTemplates: Boolean
    genFragments: Boolean
  }

  type Query {
    generate(input: Generate): String
  }
`;

const resolvers = {
  Query: {
    async generate(parent, input) {
      try {
        Object.keys(input).forEach((key) => {
          console.log(key);

          console.log({ ...input[key] });
        });

        const data = await sgtsGenerate({ ...input['input'] } as any);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

startApolloServer(typeDefs, resolvers);

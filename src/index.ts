import { ApolloServer, gql } from 'apollo-server';

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { sgtsGenerate } from './main';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

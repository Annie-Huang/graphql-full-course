const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // this is how you pass the token from frontend to api and then verify in the server whether to give user the information.
    // context.req.headers
    return { name: 'Pedro', req };
  },
});

server.listen(1338).then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});

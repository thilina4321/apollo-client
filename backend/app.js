const express = require('express')
const {ApolloServer, PubSub} = require('apollo-server-express')
const http = require('http')

// my imports
const typeDefs = require('./schema/schema')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const Subscription = require('./resolvers/subscription')
const db = require('./db/db')

const resolvers = {
  Query,
  Mutation,
  Subscription
}

const pubsub = new PubSub()

const PORT = 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context:{db, pubsub} });

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({app})
  
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
  
    // Make sure to call listen on httpServer, NOT on app.
    await new Promise(resolve => httpServer.listen(PORT, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
    return { server, app, httpServer };
  }
  
  startApolloServer()
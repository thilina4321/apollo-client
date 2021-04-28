const express = require('express')
const {ApolloServer, PubSub, AuthenticationError} = require('apollo-server-express')
const http = require('http')
const mongoose = require('mongoose')

// my imports
const typeDefs = require('./schema/schema')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const Subscription = require('./resolvers/subscription')
const db = require('./db/db')
const auth = require('./middleware/auth')

const resolvers = {
  Query,
  Mutation,
  Subscription
}

const pubsub = new PubSub()


const PORT = 4000;
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
     
     typeDefs, resolvers, context: async({req})=>{
    const {isAuth} = await auth(req)
    if(!isAuth)throw new AuthenticationError('operation is not allowed')  

    return {
      db,
      pubsub,
      isAuth

    }
  }  });
    await server.start();
    server.applyMiddleware({app})
  
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    mongoose.connect('mongodb://127.0.0.1:27017/users', {
      useNewUrlParser: true,useUnifiedTopology: true 
    })
    .then(()=>{
      console.log('connect to database successfully');
    }).catch(e=> console.log(e.message) )
  
    // Make sure to call listen on httpServer, NOT on app.
    await new Promise(resolve => httpServer.listen(PORT, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
    return { server, app, httpServer };
  }
  
  startApolloServer()
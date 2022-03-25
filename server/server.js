const express = require('express');
const path = require('path');
const db = require('./config/connection');
const {ApolloServer} = require('apollo-server-express');

const {typeDefs, resolvers} = require('./schemas');

const startServer = async () => {
    console.log("Starting Apollo server");

    // creates server with schema data
    const server = new ApolloServer ({
        typeDefs,
        resolvers,
        shouldBatch: true,
    });

    // start apollo server
    await server.start();

    // integrate Express as middleware
    server.applyMiddleware({ app })

    // logs GQL test location
    console.log(`GraphQL Test: http://localhost:${PORT}${server.graphqlPath}`)
}

// initialize ApolloServer
startServer();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../client/build")))
}

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

db.once("open", ()=>{
    app.listen(PORT, ()=>{
        console.log(`API Server running at localhost:${PORT}`)
    })
});
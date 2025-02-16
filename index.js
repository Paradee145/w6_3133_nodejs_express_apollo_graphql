require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./schema/resolvers');

const app = express();
app.use(express.json());
app.use('*', cors());

// ✅ MongoDB Connection
const connectDB = async () => {
    try {
        console.log(`🔍 Connecting to MongoDB with URL: ${process.env.MONGODB_URL}`);
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Success: Connected to MongoDB');
    } catch (error) {
        console.error(`❌ Error: MongoDB Connection Failed - ${error.message}`);
        process.exit(1);
    }
};

// ✅ Apollo Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

// ✅ Start Everything
connectDB().then(() => startServer());

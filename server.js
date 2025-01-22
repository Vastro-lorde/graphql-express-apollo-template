import { config } from "dotenv";
config();
import express from "express";
import { connectDb } from "./data/dbConnection.js";
import { rootSchema } from "./schemals/schema.js";
import { ApolloServer } from "apollo-server-express";
import { PORT } from "./secrets.js";
import { testRedis } from "./utils/redis/redisTest.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import redisHelper from "./utils/redis/redisHelper.js";


const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

async function startServer() {
    try {
        // Connect to MongoDB
        const connection = await connectDb();
        
        // Test Redis connection
        await testRedis();
        
        // Wait for Redis to be ready
        while (!redisHelper.isConnected()) {
            console.log('Waiting for Redis connection...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Apollo Server setup
        const server = new ApolloServer({ 
            schema: rootSchema,
            formatError: (error) => {
                let statusCode = 500;
                if (error.message === "Authentication required") statusCode = 401;
                if (error.message === "Not found") statusCode = 404;
                if (error.message === "Email already exists.") statusCode = 400;
                return {
                    message: error.message,
                    path: error.path,
                    extensions: {
                        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
                        timestamp: new Date().toISOString(),
                        statusCode
                    }
                };
            },
            introspection: true,
            context: ({ req }) => {
                return {
                    user: req.user,
                    redis: redisHelper,
                    db: connection
                }
            }
        });

        await server.start();
        server.applyMiddleware({ app, path: "/graphql" });
        
        app.listen(PORT || 4000, () => {
            console.log(`Server running at http://localhost:${PORT || 4000}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();
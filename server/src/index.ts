import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./utils/constants";
import { buildSchema } from "type-graphql";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, "resolvers/*.*")],
  });
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, "entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("<h1>Hello from express</h1>");
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
main();

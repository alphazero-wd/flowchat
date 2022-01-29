import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import path from "path";
import { __prod__ } from "./utils/constants";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, "entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });
  const app = express();
  app.get("/", (_, res) => {
    res.send("<h1>Hello from express</h1>");
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
main();

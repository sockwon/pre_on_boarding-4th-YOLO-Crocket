/**
 * Module dependencies.
 */

import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import dbConnect from "./mongo";

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 * @public
 */

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();

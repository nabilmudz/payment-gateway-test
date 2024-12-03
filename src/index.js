import dotenv from "dotenv";
import http from "http";
import { env } from "process";
import app from "./app.js";

dotenv.config();

const port = env.PORT;

const server = http.createServer(app);
// const server = https.createServer(app, options);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

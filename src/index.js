import http from "http";
import { env } from "process";
import app from "./app.js";

const port = env.PORT || 3036;

const server = http.createServer(app);
// const server = https.createServer(app, options);

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

import http from "http";
import app from "./app.js";

const port = process.env.PORT;

const server = http.createServer(app);
// const server = https.createServer(app, options);

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

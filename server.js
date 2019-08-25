const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;

//This is almost the same as using app.listen(port) and it might matter a little but if you wanna reuse this http server later
const server = http.createServer(app);

server.listen(port);
console.log(`Listening on port ${port}`);

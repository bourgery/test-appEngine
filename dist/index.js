"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const http = require("http");
App_1.default.set('port', 8080);
const server = http.createServer(App_1.default);
server.listen(8080);

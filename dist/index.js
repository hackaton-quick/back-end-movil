"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const login_1 = __importDefault(require("./router/login"));
const port = process.env.PORT || 3005;
const server = server_1.default.init(Number(port));
server.app.use(login_1.default);
server.start(() => {
    console.log('Servidor corriendo ' + Number(port));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const login_1 = __importDefault(require("./router/login"));
const cleaningLog_1 = __importDefault(require("./router/cleaningLog"));
const objetsClean_1 = __importDefault(require("./router/objetsClean"));
const objects_1 = __importDefault(require("./router/objects"));
const safeAreas_1 = __importDefault(require("./router/safeAreas"));
const login_log_1 = __importDefault(require("./router/login_log"));
const port = process.env.PORT || 3005;
const server = server_1.default.init(Number(port));
server.app.use(login_1.default);
server.app.use(cleaningLog_1.default);
server.app.use(objetsClean_1.default);
server.app.use(objects_1.default);
server.app.use(safeAreas_1.default);
server.app.use(login_log_1.default);
server.start(() => {
    console.log('Servidor corriendo ' + Number(port));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const sockets_1 = require("./sockets");
const auth_1 = __importDefault(require("./routes/auth"));
const groups_1 = __importDefault(require("./routes/groups"));
const habits_1 = __importDefault(require("./routes/habits"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middleware
app.use((0, cors_1.default)({ origin: env_1.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (_req, res) => res.json({ ok: true, env: env_1.env.NODE_ENV }));
// Routes
app.use('/auth', auth_1.default);
app.use('/groups', groups_1.default);
app.use('/habits', habits_1.default);
app.use('/', leaderboard_1.default);
// Socket.IO
(0, sockets_1.initSocket)(server);
// Start server
const startServer = async () => {
    await (0, db_1.connectDB)();
    server.listen(env_1.env.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${env_1.env.PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map
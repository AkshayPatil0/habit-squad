"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const leaderboardController_1 = require("../controllers/leaderboardController");
const router = (0, express_1.Router)();
router.get('/groups/:groupId/leaderboard', auth_1.authenticate, leaderboardController_1.getLeaderboard);
exports.default = router;
//# sourceMappingURL=leaderboard.js.map
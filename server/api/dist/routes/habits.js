"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const habitController_1 = require("../controllers/habitController");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, habitController_1.createHabit);
router.get('/groups/:groupId/habits', auth_1.authenticate, habitController_1.getGroupHabits);
router.get('/users/:userId/habits', auth_1.authenticate, habitController_1.getUserHabits);
router.post('/:habitId/complete', auth_1.authenticate, habitController_1.completeHabit);
exports.default = router;
//# sourceMappingURL=habits.js.map
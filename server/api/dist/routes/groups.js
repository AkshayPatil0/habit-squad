"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const groupController_1 = require("../controllers/groupController");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, groupController_1.createGroup);
router.post('/join', auth_1.authenticate, groupController_1.joinGroup);
router.get('/:groupId', auth_1.authenticate, groupController_1.getGroup);
router.get('/:groupId/members', auth_1.authenticate, groupController_1.getGroupMembers);
exports.default = router;
//# sourceMappingURL=groups.js.map
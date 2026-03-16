"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const generateToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, env_1.env.JWT_SECRET, { expiresIn: '7d' });
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            res.status(409).json({ message: 'Email already in use' });
            return;
        }
        const user = await User_1.User.create({ name, email, password });
        const token = generateToken(user.id, user.email);
        res.status(201).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const valid = await user.comparePassword(password);
        if (!valid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = generateToken(user.id, user.email);
        res.json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.login = login;
const me = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.id).populate('groups', 'name inviteCode');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.me = me;
//# sourceMappingURL=authController.js.map
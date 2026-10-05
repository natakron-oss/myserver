"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("./User"));
const Utils_1 = require("./Utils");
// create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, age, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if (!Utils_1.Utils.isValidName(name)) {
            res.status(400).json({ message: 'Name is required' });
            return;
        }
        if (!Utils_1.Utils.isValidEmail(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }
        if (!Utils_1.Utils.isValidAge(age)) {
            res.status(400).json({ message: 'Age must be an integer between 0 and 120' });
            return;
        }
        if (!Utils_1.Utils.isValidPassword(password)) {
            res.status(400).json({ message: 'Password must contain digits only' });
            return;
        }
        const newUser = new User_1.default({ name, email, age, password });
        yield newUser.save();
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            age: newUser.age,
            password: newUser.password,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
// get
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});
exports.getUsers = getUsers;
// get by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
});
exports.getUserById = getUserById;
// delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;
// update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, updateData, {
            new: true, // resend update data
            runValidators: true, // checking schema
        });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});
exports.updateUser = updateUser;
// delete all
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_1.default.deleteMany({});
        res.status(200).json({
            message: 'All users deleted',
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting users', error });
    }
});
exports.deleteAllUsers = deleteAllUsers;

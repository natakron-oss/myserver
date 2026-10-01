"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.logs = [];
    }
    add(user, action) {
        this.logs.push({ user, action, time: new Date() });
    }
    getLogs() { return this.logs; }
    lastLog() { return this.logs[this.logs.length - 1]; }
}
exports.Logger = Logger;

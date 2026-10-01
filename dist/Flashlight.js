"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashlight = void 0;
class Flashlight {
    constructor() {
        this.on = false;
    }
    turnOn() { this.on = true; }
    turnOff() { this.on = false; }
    isOn() { return this.on; }
}
exports.Flashlight = Flashlight;

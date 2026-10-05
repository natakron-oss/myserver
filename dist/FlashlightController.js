"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashlightController = void 0;
class FlashlightController {
    constructor(flashlight, logger) {
        this.flashlight = flashlight;
        this.logger = logger;
    }
    pressOn(user) {
        this.flashlight.turnOn();
    }
    pressOff(user) {
        this.flashlight.turnOff();
        this.logger.add(user, "OFF");
    }
}
exports.FlashlightController = FlashlightController;

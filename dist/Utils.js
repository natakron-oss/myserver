"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
let flashlightOn = false;
function turnOnFlashlight() {
    flashlightOn = true;
}
function turnOffFlashlight() {
    flashlightOn = false;
}
function isFlashlightOn() {
    return flashlightOn;
}
function helloworld() {
    return "hello world";
}
function add(a, b) {
    return a + b;
}
exports.Utils = {
    add,
    helloworld,
    turnOnFlashlight,
    turnOffFlashlight,
    isFlashlightOn,
};

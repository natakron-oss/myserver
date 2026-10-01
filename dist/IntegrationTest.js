"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const Flashlight_1 = require("./Flashlight");
const Logger_1 = require("./Logger");
const FlashlightController_1 = require("./FlashlightController");
let failed = 0;
const check = (name, actual, expected) => {
    if (actual === expected) {
        console.log(`✅ PASS: ${name}`);
    }
    else {
        console.log(`❌ FAIL: ${name} (คาด ${expected} แต่ได้ ${actual})`);
        failed++;
    }
};
const flashlight = new Flashlight_1.Flashlight();
const logger = new Logger_1.Logger();
const controller = new FlashlightController_1.FlashlightController(flashlight, logger);
console.log("===== Integration Test: ไฟฉาย + Logger =====");
// เริ่มต้น
check("ไฟฉายเริ่มต้นปิด", flashlight.isOn(), false);
check("เริ่มต้นยังไม่มี log", logger.getLogs().length, 0);
// Somchai กดเปิด
controller.pressOn("Somchai");
check("Somchai กดเปิด -> ไฟฉายเปิด", flashlight.isOn(), true);
check("log ล่าสุดคือ Somchai", (_a = logger.lastLog()) === null || _a === void 0 ? void 0 : _a.user, "Somchai");
check("log ล่าสุดคือ ON", (_b = logger.lastLog()) === null || _b === void 0 ? void 0 : _b.action, "ON");
// Somsri กดปิด
controller.pressOff("Somsri");
check("Somsri กดปิด -> ไฟฉายปิด", flashlight.isOn(), false);
check("log ล่าสุดคือ Somsri", (_c = logger.lastLog()) === null || _c === void 0 ? void 0 : _c.user, "Somsri");
check("log ล่าสุดคือ OFF", (_d = logger.lastLog()) === null || _d === void 0 ? void 0 : _d.action, "OFF");
// รวม
check("มี log ทั้งหมด 2 รายการ", logger.getLogs().length, 2);
console.log("============================================");
if (failed === 0) {
    console.log("🎉 ระบบทำงานร่วมกันได้ถูกต้อง");
    process.exit(0);
}
else {
    console.log(`⚠️ ไม่ผ่าน ${failed} เคส`);
    process.exit(1);
}

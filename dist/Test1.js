"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const unit_test = () => {
    // test 1: add
    if (Utils_1.Utils.add(1, 2) !== 3) {
        console.log(1);
        process.exit(1);
    }
    // test 2: helloworld
    if (Utils_1.Utils.helloworld() !== "hello world") {
        console.log(1);
        process.exit(1);
    }
    // test 3: ไฟฉายเริ่มต้นต้อง "ปิด"
    if (Utils_1.Utils.isFlashlightOn() !== false) {
        console.log(1);
        process.exit(1);
    }
    // test 4: สั่งเปิดแล้วต้อง "เปิด"
    Utils_1.Utils.turnOnFlashlight();
    if (Utils_1.Utils.isFlashlightOn() !== true) {
        console.log(1);
        process.exit(1);
    }
    // test 5: สั่งปิดแล้วต้อง "ปิด"
    Utils_1.Utils.turnOffFlashlight();
    if (Utils_1.Utils.isFlashlightOn() !== false) {
        console.log(1);
        process.exit(1);
    }
    console.log(0); // ผ่านทั้งหมด
    process.exit(0);
};
unit_test();

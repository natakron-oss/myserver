"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
let failed = 0;
const check = (name, actual, expected) => {
    if (actual === expected) {
        console.log(`✅ PASS: ${name}`);
    }
    else {
        console.log(`❌ FAIL: ${name} (คาดว่า ${expected} แต่ได้ ${actual})`);
        failed++;
    }
};
const unit_test = () => {
    console.log("===== เริ่มทดสอบ =====");
    // test 1: add
    check("add(1, 2) ต้องได้ 3", Utils_1.Utils.add(1, 2), 3);
    // test 2: helloworld
    check("helloworld() ต้องได้ 'hello world'", Utils_1.Utils.helloworld(), "hello world");
    // test 3: ไฟฉายเริ่มต้นต้องปิด
    check("ไฟฉายเริ่มต้นต้องปิด", Utils_1.Utils.isFlashlightOn(), false);
    // test 4: สั่งเปิดแล้วต้องเปิด
    Utils_1.Utils.turnOnFlashlight();
    check("สั่งเปิดแล้วไฟฉายต้องเปิด", Utils_1.Utils.isFlashlightOn(), true);
    // test 5: สั่งปิดแล้วต้องปิด
    Utils_1.Utils.turnOffFlashlight();
    check("สั่งปิดแล้วไฟฉายต้องปิด", Utils_1.Utils.isFlashlightOn(), false);
    console.log("======================");
    if (failed === 0) {
        console.log("🎉 ผ่านทุกเคส (ไม่มี bug)");
        process.exit(0);
    }
    else {
        console.log(`⚠️ ไม่ผ่าน ${failed} เคส`);
        process.exit(1);
    }
};
unit_test();

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
    // add / helloworld
    check("add(1, 2) ต้องได้ 3", Utils_1.Utils.add(1, 2), 3);
    check("helloworld() ต้องได้ 'hello world'", Utils_1.Utils.helloworld(), "hello world");
    // name
    check("ชื่อ 'Somchai' ถูกต้อง", Utils_1.Utils.isValidName("Somchai"), true);
    check("ชื่อว่างต้องไม่ผ่าน", Utils_1.Utils.isValidName("   "), false);
    check("ชื่อไม่ใช่ string ต้องไม่ผ่าน", Utils_1.Utils.isValidName(undefined), false);
    // email format
    check("email 'a@hotmail.com' ถูกต้อง", Utils_1.Utils.isValidEmail("a@hotmail.com"), true);
    check("email 'a.b+c@mail.co.th' ถูกต้อง", Utils_1.Utils.isValidEmail("a.b+c@mail.co.th"), true);
    check("email ไม่มี @ ต้องไม่ผ่าน", Utils_1.Utils.isValidEmail("abc.com"), false);
    check("email ไม่มี domain ต้องไม่ผ่าน", Utils_1.Utils.isValidEmail("abc@"), false);
    check("email ไม่มี .tld ต้องไม่ผ่าน", Utils_1.Utils.isValidEmail("abc@hotmail"), false);
    check("email มีช่องว่างต้องไม่ผ่าน", Utils_1.Utils.isValidEmail("a b@hotmail.com"), false);
    check("email ว่างต้องไม่ผ่าน", Utils_1.Utils.isValidEmail(""), false);
    check("email ไม่ใช่ string ต้องไม่ผ่าน", Utils_1.Utils.isValidEmail(123), false);
    // age
    check("อายุ 20 ถูกต้อง", Utils_1.Utils.isValidAge(20), true);
    check("อายุ 0 ถูกต้อง", Utils_1.Utils.isValidAge(0), true);
    check("อายุ 120 ถูกต้อง", Utils_1.Utils.isValidAge(120), true);
    check("อายุติดลบต้องไม่ผ่าน", Utils_1.Utils.isValidAge(-1), false);
    check("อายุ 121 ต้องไม่ผ่าน", Utils_1.Utils.isValidAge(121), false);
    check("อายุทศนิยมต้องไม่ผ่าน", Utils_1.Utils.isValidAge(20.5), false);
    check("อายุเป็น string ต้องไม่ผ่าน", Utils_1.Utils.isValidAge("20"), false);
    check("อายุ NaN ต้องไม่ผ่าน", Utils_1.Utils.isValidAge(NaN), false);
    // password (ตัวเลขเท่านั้น)
    check("รหัส '1234' ถูกต้อง", Utils_1.Utils.isValidPassword("1234"), true);
    check("รหัส '0000' ถูกต้อง", Utils_1.Utils.isValidPassword("0000"), true);
    check("รหัสมีตัวอักษรต้องไม่ผ่าน", Utils_1.Utils.isValidPassword("12ab"), false);
    check("รหัสมีช่องว่างต้องไม่ผ่าน", Utils_1.Utils.isValidPassword("12 34"), false);
    check("รหัสมีสัญลักษณ์ต้องไม่ผ่าน", Utils_1.Utils.isValidPassword("12-34"), false);
    check("รหัสว่างต้องไม่ผ่าน", Utils_1.Utils.isValidPassword(""), false);
    check("รหัสไม่ใช่ string ต้องไม่ผ่าน", Utils_1.Utils.isValidPassword(1234), false);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[0-9]+$/;
const MIN_AGE = 0;
const MAX_AGE = 120;
function helloworld() {
    return "hello world";
}
function add(a, b) {
    return a + b;
}
// อีเมลต้องเป็นรูปแบบ something@domain.tld
function isValidEmail(email) {
    return typeof email === "string" && EMAIL_REGEX.test(email);
}
// ชื่อต้องเป็น string ที่ไม่ว่าง
function isValidName(name) {
    return typeof name === "string" && name.trim().length > 0;
}
// อายุต้องเป็นจำนวนเต็ม 0-120
function isValidAge(age) {
    return (typeof age === "number" &&
        Number.isInteger(age) &&
        age >= MIN_AGE &&
        age <= MAX_AGE);
}
// รหัสผ่านต้องเป็นตัวเลข 0-9 เท่านั้น (อย่างน้อย 1 ตัว)
function isValidPassword(password) {
    return typeof password === "string" && PASSWORD_REGEX.test(password);
}
exports.Utils = {
    add,
    helloworld,
    isValidName,
    isValidEmail,
    isValidAge,
    isValidPassword,
};

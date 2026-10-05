const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[0-9]+$/;
const MIN_AGE = 0;
const MAX_AGE = 120;

function helloworld(): string {
  return "hello world";
}

function add(a: number, b: number): number {
  return a + b;
}

// อีเมลต้องเป็นรูปแบบ something@domain.tld
function isValidEmail(email: unknown): boolean {
  return typeof email === "string" && EMAIL_REGEX.test(email);
}

// ชื่อต้องเป็น string ที่ไม่ว่าง
function isValidName(name: unknown): boolean {
  return typeof name === "string" && name.trim().length > 0;
}

// อายุต้องเป็นจำนวนเต็ม 0-120
function isValidAge(age: unknown): boolean {
  return (
    typeof age === "number" &&
    Number.isInteger(age) &&
    age >= MIN_AGE &&
    age <= MAX_AGE
  );
}

// รหัสผ่านต้องเป็นตัวเลข 0-9 เท่านั้น (อย่างน้อย 1 ตัว)
function isValidPassword(password: unknown): boolean {
  return typeof password === "string" && PASSWORD_REGEX.test(password);
}

export const Utils = {
  add,
  helloworld,
  isValidName,
  isValidEmail,
  isValidAge,
  isValidPassword,
};

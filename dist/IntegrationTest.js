"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = index_1.app.listen(3001);
    try {
        const res = yield fetch("http://localhost:3001/");
        const text = yield res.text();
        if (res.status === 200 && text === "Hello, World!") {
            console.log("Integration test PASSED");
            server.close();
            process.exit(0);
        }
        else {
            console.log("Integration test FAILED: got", res.status, text);
            server.close();
            process.exit(1);
        }
    }
    catch (e) {
        console.log("Integration test FAILED:", e);
        server.close();
        process.exit(1);
    }
});
run();

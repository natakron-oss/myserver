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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // npm install --save-dev @types/cors
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const dns_1 = __importDefault(require("dns"));
dns_1.default.setServers(['8.8.8.8', '1.1.1.1']);
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// อ่าน connection string จาก config.json (ไม่เอา username/password ขึ้น GitHub)
// ลำดับ: ตัวแปร env MONGODB_URI -> src/config.json -> ./config.json (root)
const loadMongoUri = () => {
    if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
    }
    const candidates = [
        path_1.default.join(__dirname, 'config.json'),
        path_1.default.join(__dirname, '..', 'config.json'),
        path_1.default.join(__dirname, '..', 'src', 'config.json'),
    ];
    for (const file of candidates) {
        if (fs_1.default.existsSync(file)) {
            const data = fs_1.default.readFileSync(file, { encoding: 'utf8', flag: 'r' });
            const config = JSON.parse(data);
            return config.connection;
        }
    }
    throw new Error('ไม่พบ connection string: สร้างไฟล์ config.json (ดู config.example.json) หรือตั้งค่า env MONGODB_URI');
};
// Middleware
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
// โฟลเดอร์ public html (src/public) ใช้ได้ทั้งตอนรันจาก src/ และ dist/
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'public')));
exports.app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Routes
exports.app.use('/api', UserRoutes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(loadMongoUri());
        console.log('Connected to MongoDB');
        exports.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
});
if (require.main === module) {
    start();
}

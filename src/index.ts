import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // npm install --save-dev @types/cors
import fs from 'fs';
import path from 'path';
import userRoutes from './UserRoutes';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const app = express();
const port = process.env.PORT || 3000;

// อ่าน connection string จาก config.json (ไม่เอา username/password ขึ้น GitHub)
// ลำดับ: ตัวแปร env MONGODB_URI -> src/config.json -> ./config.json (root)
const loadMongoUri = (): string => {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  const candidates = [
    path.join(__dirname, 'config.json'),
    path.join(__dirname, '..', 'config.json'),
    path.join(__dirname, '..', 'src', 'config.json'),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      const data: string = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
      const config = JSON.parse(data);
      return config.connection;
    }
  }
  throw new Error(
    'ไม่พบ connection string: สร้างไฟล์ config.json (ดู config.example.json) หรือตั้งค่า env MONGODB_URI'
  );
};

// Middleware
app.use(express.json());
app.use(cors());

// โฟลเดอร์ public html (src/public) ใช้ได้ทั้งตอนรันจาก src/ และ dist/
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Routes
app.use('/api', userRoutes);

const start = async () => {
  try {
    await mongoose.connect(loadMongoUri());
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

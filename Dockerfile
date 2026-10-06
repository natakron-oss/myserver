# ---------- Stage 1: build (ติดตั้ง devDependencies แล้ว compile TypeScript) ----------
FROM node:22-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Stage 2: runtime (เฉพาะ production dependencies) ----------
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /usr/src/app/dist ./dist
# index.ts เสิร์ฟไฟล์ html จาก src/public
COPY src/public ./src/public

EXPOSE 3000
USER node
CMD ["npm", "start"]

FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

COPY --from=builder /app/prisma ./prisma

RUN npm install --only=production --force

RUN npx prisma generate

CMD ["node", "build/server.js"]

FROM node:19-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
COPY . .

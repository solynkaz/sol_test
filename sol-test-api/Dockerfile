# syntax=docker/dockerfile:1

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache wget

COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
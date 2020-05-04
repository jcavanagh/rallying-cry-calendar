FROM node:current-slim

WORKDIR /app
COPY package*.json ./
COPY src ./src

RUN npm install

CMD ["node", "src/index.js"]

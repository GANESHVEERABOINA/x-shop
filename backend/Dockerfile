FROM node:18-slim AS builder
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "server.js"]
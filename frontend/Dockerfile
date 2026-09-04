#stage 1
FROM node:18-slim AS builder
WORKDIR /FRONTEND
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#stage 2
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

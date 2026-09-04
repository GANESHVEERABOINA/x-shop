FROM node:18-slim

WORKDIR /app

# 1. Mundu package files copy chesi install chesthunnam
COPY package*.json ./
RUN npm install

# 2. Mee screenshot lo unna files/folders annitini explicit ga copy chesthunnam
COPY config/ ./config/
COPY controllers/ ./controllers/
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routes/ ./routes/
COPY server.js ./
COPY vercel.json ./

# 3. Root user tho run avvakunda in-built 'node' user ki marthunnam
USER node

EXPOSE 4000

CMD ["node", "server.js"]

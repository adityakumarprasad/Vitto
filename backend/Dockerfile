# ============================================================
# Backend Dockerfile – builds and runs the Express API
# ============================================================

FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better Docker layer caching)
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

# Copy the rest of the application source
COPY . .

EXPOSE 5000

# Push schema then start the server
CMD ["sh", "-c", "npx prisma db push && node src/server.js"]

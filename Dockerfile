# Stage 1: build the React frontend 
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cached unless package.json changes)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# VITE_API_URL must be set at build time so Vite can bake it into the JS bundle.
# .env is excluded from Docker builds (it's in .dockerignore), so we set it here.
ENV VITE_API_URL=/api
RUN npm run build
# dist/ now contains the compiled frontend


# Stage 2: production image 
FROM node:20-alpine AS production

WORKDIR /app

# Copy only what the server needs at runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source (tsx runs it directly — no compile step needed)
COPY backend/ ./backend/
COPY tsconfig.backend.json ./

# Copy the built frontend so Express can serve it
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npx", "tsx", "backend/server.ts"]

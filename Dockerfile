# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Set timezone to Malaysia
ENV TZ=Asia/Kuala_Lumpur

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .
COPY .env .env

# Build application
RUN yarn cache clean
RUN yarn build

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set timezone to Malaysia
ENV TZ=Asia/Kuala_Lumpur
ENV NODE_ENV=production

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
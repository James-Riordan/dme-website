# Stage 1: Base Image with Bun + Dependencies
FROM oven/bun:latest AS base

WORKDIR /app

# Copy package files & install dependencies
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Stage 2: Build Phase
FROM base AS build

# Generate static build for SvelteKit
RUN bun run build

# Stage 3: Production Environment
FROM oven/bun:latest AS production

WORKDIR /app

# Copy only the built output & dependencies
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# Set environment variables (can be overridden in `docker-compose.yml`)
ENV NODE_ENV=production
ENV PORT=5173

# Expose port
EXPOSE 5173

# Start SvelteKit app
CMD ["bun", "run", "preview"]

# Stage 1: Development Stage
FROM node:alpine AS development

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Inspect the environment before build
RUN ls -la
RUN npm run build

# Stage 2: Production Stage
FROM node:alpine AS production

# Set environment variable for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Copy package files again to install only production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the compiled application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Define the command to run the application
CMD ["node", "dist/main"]

# Stage 1: Development Stage
FROM node:18-alpine AS development

# Instala dependencias necesarias para bcrypt y otras bibliotecas nativas
RUN apk add --no-cache python3 make g++ 

# Set working directory
WORKDIR /usr/src/app/gateway

# Copy package files
COPY package.json ./
COPY tsconfig*.json ./
COPY cloudbuild.yaml ./
COPY config.yaml ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code, except for node_modules
COPY . .

# Run the build process
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS production

# Instala dependencias necesarias para bcrypt y otras bibliotecas nativas
RUN apk add --no-cache python3 make g++

# Set environment variable for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app/gateway

# Copy package files again to install only production dependencies
COPY package.json ./
COPY tsconfig*.json ./
COPY cloudbuild.yaml ./
COPY config.yaml ./

# Install only production dependencies
RUN npm install --only=production

# Copy the compiled application from the development stage
COPY --from=development /usr/src/app/gateway/dist ./dist

# Define the command to run the application
CMD ["node", "dist/main"]

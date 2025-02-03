# Base Image
FROM mcr.microsoft.com/playwright:v1.50.1-noble
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .

RUN npx playwright install
# Set the entry point for the container
CMD ["npx", "playwright", "test", "garage"]
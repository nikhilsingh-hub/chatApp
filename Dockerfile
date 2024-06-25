# Use the latest LTS Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy backend package files
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source files
COPY server ./

# Copy frontend build files to backend public directory
COPY public/build ./public

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "start"]

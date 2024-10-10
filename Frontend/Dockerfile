# Install Linux Alpine (specific version) + Node.js (specific version)
FROM node:20-alpine3.19

# Create app folder inside the image - at root level + make it the current directory:
WORKDIR /server

# Copy package.json and package-lock.json from root (.) into image /server folder: 
COPY package*.json /server

# Install packages:
RUN npm i

# Copy source files from developer computer (.) into the /server folder inside the image (/server): 
COPY . /server

# Specify which terminal command will run the application: 
ENTRYPOINT npm start

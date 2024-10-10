# Use a specific version of the Alpine-based Node image
FROM node:20-alpine3.19

# Install global installations needed inside a terminal for development:
RUN npm install -g ts-node nodemon

# Create app folder inside the image at root level & make it the current directory:
WORKDIR /server

# Copy package.json and package-lock.json into the image's app folder:
COPY package*.json /server

# Install packages, adding error handling:
RUN npm i

# Copy source files from developer computer into the /server folder inside the image:
COPY . /server

# Specify the terminal command to run the application:
ENTRYPOINT npm start

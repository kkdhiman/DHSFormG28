FROM node:carbon

# Set the directory root
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Run npm install command
RUN npm install

# Copy source file(s) to working directory
COPY src/ ./

# Ensure port 3000 is open
EXPOSE 3000

# Run the node server
CMD [ "npm", "start" ]
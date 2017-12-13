# Dockerfile for building and testing Angular 5 application artifacts outside of Jenkins server.
FROM node:7

# Install Chrome for headless testing
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable
RUN ln -s /usr/bin/google-chrome-stable /usr/bin/chrome

# Use npm to install angular-cli tools for building and testing our code
RUN npm install -g @angular/cli
RUN npm i -g karma
RUN npm i -g nyc

WORKDIR /app
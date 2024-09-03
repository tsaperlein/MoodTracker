# Pull base image
FROM node:22

# Set our node environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Default to port 19006 for node, and 19001 and 19002 for debug
ARG PORT=19006
ENV PORT=$PORT
EXPOSE $PORT 19001 19002

# Set IP address for the Expo packager host
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.103"

# Install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
RUN npm install -g npm@latest eas-cli

# Clean npm cache
RUN npm cache clean --force

# Create and set the working directory
RUN mkdir /opt/moodtracker
WORKDIR /opt/moodtracker

# Copy package.json and package-lock.json to the working directory and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# (Optional) Install @expo/ngrok if necessary
RUN npm explore expo -- npm install @expo/ngrok@^4.1.0

# Copy the rest of the application files
COPY . .

# Set up the entrypoint and default command
CMD ["npn", "run", "tunnel"]

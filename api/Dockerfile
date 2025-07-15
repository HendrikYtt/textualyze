FROM node:20-alpine

# Update and install the necessary dependencies
RUN apk update && apk add --no-cache \
    ffmpeg \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    python3 \
    py3-pip \
    curl

# Create a symlink for python3 as python
RUN rm -f /usr/bin/python && ln -s /usr/bin/python3 /usr/bin/python

RUN python --version || true

# Download yt-dlp binary and place it in a directory included in the PATH
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /usr/src/app

# Install main project dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the entire project
COPY . .

# Build the main project
RUN yarn run build

# Install Remotion project dependencies
WORKDIR /usr/src/app/src/features/remotion/source
COPY src/features/remotion/source/package*.json ./
RUN npm install

# Copy the Remotion project to the dist directory
WORKDIR /usr/src/app
RUN cp -r src/features/remotion/source dist/src/features/remotion/

# Set the working directory back to /usr/src/app for runtime
CMD ["node", "dist/src/index.js"]

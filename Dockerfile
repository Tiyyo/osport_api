FROM node:18

# Working directory
WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install eslint -g

# Install Files
RUN npm install

# Copy source files
COPY . ./

RUN npm run build

# Expose the API port
EXPOSE 8843

CMD ["node","build/index.js"]
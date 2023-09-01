FROM node:18

# Working directory
WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY tsconfig.json file
COPY tsconfig.json ./

RUN npm install eslint -g

# Install Files
RUN npm install

RUN npx prisma generate

# Copy source files
COPY . ./

RUN npm run build

# Expose the API port
EXPOSE 8843

CMD ["node","build/index.js"]
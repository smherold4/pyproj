FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for better Docker layer caching
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN yarn build

EXPOSE 3000

# Start the app
CMD ["yarn", "start"]

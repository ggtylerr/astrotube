# Use Node.js 22 as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy the package and lock files
COPY package.json yarn.lock ./

# Set up Yarn with version Berry
RUN yarn set version berry && yarn install

# Copy the rest of the project files
COPY . .

# Ensure the example config file is in place
RUN cp config.ts.example config.ts

# Expose the container's port
EXPOSE 4321

# Command to start the development server
CMD ["yarn", "dev"]

FROM node:16-alpine as development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .


FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist .

# RUN yarn install --frozen-lockfile --only=production

# EXPOSE 3000
# CMD [ "node", "index.js" ]
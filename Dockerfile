FROM node:16 as development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

RUN yarn start:prod


FROM node:16 as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist .

RUN yarn install --frozen-lockfile --only=production

EXPOSE 8080
CMD [ "node", "index.js" ]
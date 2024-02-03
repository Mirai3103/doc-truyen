FROM node:21-alpine3.18
# build nestjs app
WORKDIR /app
COPY . /app
RUN apk add --no-cache make gcc g++ python3
RUN npm install -g npm@10.4.0
RUN npm i 
RUN npm rebuild bcrypt --build-from-source
RUN npm i -g @nestjs/cli
RUN npm run build
RUN rm -rf node_modules
ENV NODE_ENV production
RUN npm i 
RUN npm ci --only=production
RUN npm cache clean --force
RUN apk del make gcc g++ python3



CMD ["yarn", "start:prod"]
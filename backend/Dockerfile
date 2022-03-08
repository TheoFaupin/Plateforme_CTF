FROM node:16.8.0-alpine
WORKDIR /app
COPY --chown=node:node package.json ./
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm install --global node-gyp
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY --chown=node:node . .
EXPOSE 3000
USER node
CMD ["npm", "run", "dev"]

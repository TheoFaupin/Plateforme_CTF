FROM node:16.8.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN mkdir -p /home/node/app &&\
 chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json /home/node/app
COPY package*.json /home/node/app/

RUN chgrp -R 0 /home/node/app &&\
 chmod -R g+rwX /home/node/app
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm install --global node-gyp
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY --chown=node:node . /home/node/app
EXPOSE 3001
USER 1000
CMD ["npm", "start", "-y"]

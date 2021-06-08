FROM node:16.2.0
WORKDIR /usr/src/app
COPY package*.json ./
#RUN npm install
RUN npm ci --only=production
COPY . .
#EXPOSE 4000
ENV NODE_ENV production
ENTRYPOINT ["npm", "start"]
USER node

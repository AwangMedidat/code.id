FROM node:12.0-alpine

WORKDIR /var/www/express-app

ENV PORT=4000

RUN npm install

COPY . .

CMD ["npm","run","dev"]
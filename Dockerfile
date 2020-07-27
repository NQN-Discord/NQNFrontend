FROM node:8.9.3 as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

RUN npm install
RUN npm run build
RUN npm run precompress -v build

FROM nginx:1.15
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

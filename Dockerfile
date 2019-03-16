FROM node:8.9.3 as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./frontend/package.json /usr/src/app/package.json
RUN npm install

COPY ./frontend /usr/src/app

RUN npm build


FROM nginx:1.15
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
FROM node:12.18 as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
COPY ./semantic.json /usr/src/app/semantic.json
COPY ./semantic /usr/src/app/semantic

RUN npm install

COPY . /usr/src/app

RUN npm run build
RUN npm run precompress -v build

FROM python:3.7 as py

COPY ./py/requirements.txt requirements.txt
RUN pip install -U pip wheel setuptools \
 && pip install -r requirements.txt

COPY ./py /

COPY --from=build /usr/src/app/build /
RUN python main.py --src /build --dest /dest

FROM nginx:1.15
COPY --from=py /dest /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

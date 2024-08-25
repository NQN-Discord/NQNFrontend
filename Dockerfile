FROM node:19.8 as build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

RUN apt-get update && apt-get install --no-install-recommends -y \
  ca-certificates \
  fontconfig \
  fonts-liberation \
  gconf-service \
  libappindicator1 \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  lib\x11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  locales \
  lsb-release \
  unzip \
  wget \
  xdg-utils \
  google-chrome-stable


RUN useradd --create-home --user-group --shell /bin/bash app
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

COPY ./package.json /home/app/package.json
COPY ./package-lock.json /home/app/package-lock.json
COPY ./semantic.json /home/app/semantic.json
COPY ./src/semantic /home/app/src/semantic

RUN chmod -R 777 /home/app

USER app

RUN npm install --legacy-peer-deps

COPY . /home/app

RUN npm run build
RUN npm run precompress -v build

FROM nginx:1.15
COPY --from=build /home/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["bash", "/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

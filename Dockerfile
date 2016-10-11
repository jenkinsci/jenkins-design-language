FROM node:5.11.1

RUN apt-get update && apt-get install -y libelf1
RUN npm install -g npm@3.8.9

RUN useradd jenkins --shell /bin/bash --create-home
USER jenkins

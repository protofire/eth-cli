FROM node:10

WORKDIR /eth-cli

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY src src
COPY bin bin
COPY README.md .prettierrc.json tsconfig.json tslint.json ./

RUN yarn prepack

COPY e2e e2e

CMD node e2e/run.js

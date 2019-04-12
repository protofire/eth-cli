FROM node:10

# Create app directory
WORKDIR /usr/src/app
ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"

COPY package.json ./

RUN npm install

EXPOSE 8545
CMD ganache-cli --noVMErrorsOnRPCResponse --gasLimit 30000000 -h 0.0.0.0 -p 8545 --networkId 50 -d

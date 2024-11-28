ARG NODEJS_VERSION=18

##### Stage 1

FROM node:$NODEJS_VERSION-alpine AS builder

RUN adduser -D builder && \
    mkdir /home/builder/build && \
    chown -R builder:builder /home/builder/

USER builder
WORKDIR /home/builder/build

COPY ./yarn.lock ./package.json ./.npmrc ./
RUN yarn install --frozen-lockfile


##### Stage 2

FROM node:$NODEJS_VERSION-alpine

RUN apk update && apk add --no-cache mysql-client=~10 && \
    mkdir -p /home/klayr/klayr-service/blockchain-indexer/data && \
    adduser -D klayr && \
    chown -R klayr:klayr /home/klayr/

USER klayr
WORKDIR /home/klayr/klayr-service/blockchain-indexer

COPY --chown=klayr:klayr ./ .
COPY --chown=klayr:klayr --from=builder /home/builder/build/node_modules/ ./node_modules/

CMD ["node", "app.js"]

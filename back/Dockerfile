FROM node:20.0-slim

RUN apt-get update && apt-get install -y curl

RUN usermod -u 1 root

RUN usermod -u 0 node

USER node

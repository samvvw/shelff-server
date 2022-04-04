FROM node:16
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
RUN yarn build
COPY ./dist ./
CMD ["yarn", "start"]
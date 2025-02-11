FROM node:22.13.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
RUN yarn link
COPY . .
CMD ["yarn", "migrate"]

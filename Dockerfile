FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --ignore-scripts
COPY . .
RUN yarn generate
COPY prisma ./prisma/
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start:prod"]

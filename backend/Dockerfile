FROM node:latest
WORKDIR /app
COPY . .
RUN rm -rf node_modules dist
RUN npm install
CMD ["npm", "run", "start:dev"]
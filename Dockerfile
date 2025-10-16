FROM node:lts-buster
RUN git clone https://github.com/timnasa/FREE_INTERNET_BOT/root/ItFred
WORKDIR /root/ItFred
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]

FROM node

WORKDIR /gitlab-hook
COPY src/ /gitlab-hook/

RUN npm install -g nodemon
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]

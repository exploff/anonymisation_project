FROM python:latest as build
RUN pip install pipreqs
COPY scripts ./scripts
RUN pipreqs --f ./scripts

FROM node:16.17.1-alpine
RUN apk update && apk add --no-cache python3=3.10.10-r0 py3-pip=22.1.1-r0
RUN pip install --upgrade pip
WORKDIR /usr/src/app
COPY scripts/ ./scripts
COPY --from=build ./scripts/requirements.txt ./scripts
# RUN pip3 install -r ./scripts/requirements.txt
COPY webserver ./webserver
RUN npm install --prefix ./webserver --production
CMD ["node" , "./webserver/serveur.js" ]


#Faire un from python pour copier le requirements.txt avec la commande pipreqs / pip install pipreqs

#docker build -t anonym:test -f docker/Dockerfile .
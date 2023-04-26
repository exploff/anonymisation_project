FROM python:latest as build
RUN pip install pipreqs
COPY scripts ./scripts
RUN pipreqs --f ./scripts

FROM nikolaik/python-nodejs:python3.10-nodejs16-slim
WORKDIR /usr/src/app
COPY scripts/ ./scripts
COPY --from=build ./scripts/requirements.txt ./scripts
RUN pip3 install -r ./scripts/requirements.txt
COPY webserver ./webserver
RUN npm install --prefix ./webserver --production
CMD ["node" , "./webserver/serveur.js" ]

#Faire un from python pour copier le requirements.txt avec la commande pipreqs / pip install pipreqs

#docker build -t anonym:test -f docker/Dockerfile .
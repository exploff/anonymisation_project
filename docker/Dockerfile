FROM nikolaik/python-nodejs:python3.10-nodejs16-slim
RUN pip install --upgrade pip
WORKDIR /usr/src/app
COPY webserver ./webserver
RUN npm install --prefix ./webserver --production
COPY scripts/ ./scripts
RUN pip3 install -r ./scripts/requirements.txt
CMD ["node" , "./webserver/serveur.js" ]

#Faire un from python pour copier le requirements.txt avec la commande pipreqs / pip install pipreqs

#docker build -t anonym:test -f docker/Dockerfile .
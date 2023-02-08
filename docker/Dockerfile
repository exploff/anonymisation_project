FROM nginx:latest
RUN apt-get update -y && apt-get install -y python3
ENV NODE_VERSION=16.17.1
RUN apt-get install -y curl python3-pip
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
WORKDIR /usr/src/app
COPY anonymisation_project/scripts ./scripts
COPY anonymisation_project/webserver ./webserver
RUN pip install -r ./scripts/requirements.txt
RUN npm install --prefix ./webserver --production
CMD ["node" , "./webserver/server.js" ]


# Faire un from python pour copier le requirements.txt avec la commande pipreqs / pip install pipreqs


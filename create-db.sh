sudo systemctl start docker
docker stop fidjet-db
docker stop fidjet-client-db
sudo docker run -d --name fidjet-db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=fidjet-root -e MONGO_INITDB_ROOT_PASSWORD=puxxleizp mongo
sudo docker run -d --name fidjet-client-db -p 27020:27017 -e MONGO_INITDB_ROOT_USERNAME=fidjet-client-root -e MONGO_INITDB_ROOT_PASSWORD=puxxleizp-client mongo
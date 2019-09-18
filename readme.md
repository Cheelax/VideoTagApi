### Lancer le serveur
docker run -p 49160:8080 -d node-web-app
### Lancer les tests
npm test 
# Get container ID
$ docker ps

# Print app output 
$ docker logs <container id> 219f8f57777d
docker-compose up -d --build
docker-compose run e2e ./node_modules/.bin/jest --verbose --runInBand e2e
rc=$?
docker-compose down
exit $rc

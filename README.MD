Это репозиторий для тестирования CI / CD

Запуск докер файлов

docker network create sol-test-net

docker build -t sol-test-backend ./sol-test-dotnet
docker build -t sol-test-frontend ./sol-test-ng

docker run -d --name sol-test-backend --network sol-test-net --network-alias backend -p 5143:8080 sol-test-backend

docker run -d --name sol-test-frontend --network sol-test-net -e PORT=80 -e BACKEND_URL=http://backend:8080 -p 4200:80 sol-test-frontend

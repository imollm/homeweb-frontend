# HomewebFrontend

Frontend that consume on https://github.com/imollm/homeweb-backend

### Run with Docker

1. Clone repository

   ````sh
    git clone --branch docker https://github.com/imollm/homeweb-frontend
   ````
   
2. Build image through Dockerfile

    ````sh
    docker build -t homeweb-frontend:v1.0 .
    ````
3. Execute container based of this image
   
    ````sh
    docker run -d --name homeweb-frontend -p 4200:4200 homeweb-frontend:v1.0
    ````
   
4. Stop and run container
   
    ````sh
    docker stop homeweb-frontend
    docker start homeweb-frontend
    ````
5. Visit http://localhost:4200
  

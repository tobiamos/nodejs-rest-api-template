# Nodejs Rest Api Template

## Installation

### 1. Prerequsites

You will need to have already installed these tools
- Nodejs (preferably through nvm)
- npm
- Docker
-A tool to read `.env` files


### 1. Clone the repo
  `$ git clone git@github.com:tobiamos/nodejs-rest-api-template`

### 2. Install the dependencies
 ` $ npm install `

### 3. Create a `.env` file
You can find the default content in `.env.example`

### 4. Start the Docker Services
  `$ docker-compose up -d redis mongo rabbitmq`

### 5. Start the server
  `$ npm run dev`
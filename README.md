## Description

This is a fitness app made to automate scheduling process. It includes registration(authentication) and classes implementation (relations between trainers and users).

## Installation
You have to install [pgAdmin](https://www.postgresql.org/download/) and set </br>
username: postgres</br>password: password</br>
Those fields can be modified in docker-compose.yml</br>
Also you have to install [Docker](https://www.docker.com/get-started)</br>
Then open your terminal:
```bash
$ git clone https://github.com/safchug/mad-fitness
$ cd mad-fitness
$ git pull https://github.com/safchug/mad-fitness develop
$ npm install
```
## Running the app

```bash
$ docker-compose up --build
```


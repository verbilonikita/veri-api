# API for verivox app

## IMPORTANT

if you want to use docker-compose - please put folders as "siblings" - in the same root directory:

- your folder
- - verivox-api
- - verivox-front

then run "docker-compose up" from "verivox-front"

otherwise, please run npm run start

## features

Please note, I am using sqlite db with basic setup, without ORM at this point. One controller, simple requests.

1. nest: similar architecture to angular, so decided to stick with this framework instead of just using express library
2. exception-filter to catch custom errors
3. added router - two routes:

- error router to handle unhandled routes
- route /electricity/calculate that accepts POST request with one key in body "kwh: number"
- service to handle post request coming from api

4. controller handles business logic

- parses data from "db"
- modifies response: returns { name: string, cost: number } for each option
- sorts data (first element is array is always a best option for user)

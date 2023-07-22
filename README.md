# API for verivox app

## IMPORTANT

if you want to use docker-compose - please put it in the same root directory with front folder:

- your folder
- - api-folder
- - front-folder

otherwise, please run npm run start

## features

1. nest: similar framework to angular, the same architecture, so decided to stick with this framework instead of just simply using express library
2. exception-filter to catch custom errors
3. added router - two routes:

- error router to handle unhandled routes
- service to handle post request coming from api

4. using json object as mock db
5. controller handles business logic

- parses data from "db"
- modifies response (name + annual cost)
- sorts data (first element is array is always a best option for user)

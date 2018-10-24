# Sapient test
Write an API for a credit card provider.

## Requirements
- Install node (10+ adviced), https://nodejs.org/en/
- Run ```npm install``` to install all the libraries

## How to run
- ```npm run start```
- Use postman or similar on `http://localhost:3123/cards`
- Postman => https://www.getpostman.com/

## Endpoint
For details please check tests
POST /cards {name: 'Stefano', number: 1234, limit: £1000} to create a card
PUT /cards/charge/:Stefano {amount: £100} to add moneys
PUT /cards/credit/:Stefano {amount: £100} to remove moneys
GET /cards to get all cards

## How to run tests
- ```npm run test```

## Final Thoughs
There are a few things I would add at this point but I feel I'm already over
my time for this test.
I started 7 hours ago and I had 1 hour break to exercise and eat.
I would probably add a better ORM layer and separate the card business logic from the actual endpoint.
I would probably also discuss some choices around requirements, but the back and forth would take time.
So here it is my test :)

## How to
Are you still reading? I'm impressed! I feel kind of guilty this file is so short, I could have done it better but... well... do you want to hear a joke then?
"Netflix currently uses 30% of the bandwidth, the rest is used by rm -f node_modules %% npm install"
Ok, nevermind, I should stop now
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
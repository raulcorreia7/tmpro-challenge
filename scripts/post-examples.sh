#!/bin/bash

EMAIL="hello@world.com"
curl -v -XPOST -H "Content-type: application/json" -d '{ "message" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "delivery" : "email", "target" : "hello@world.com" }' 'https://6wajpkf360.execute-api.eu-central-1.amazonaws.com/message'
curl -v -XPOST -H "Content-type: application/json" -d '{ "message" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "delivery" : "sms", "target" : "hello@world.com" }' 'https://6wajpkf360.execute-api.eu-central-1.amazonaws.com/message'

curl -v -XPOST -H "Content-type: application/json" -d '{ "message" : "I dont know boss.", "delivery" : "email", "target" : "asd@world.com" }' 'https://6wajpkf360.execute-api.eu-central-1.amazonaws.com/message'
curl -v -XPOST -H "Content-type: application/json" -d '{ "message" : "I dont know boss.", "delivery" : "sms", "target" : "asd@world.com" }' 'https://6wajpkf360.execute-api.eu-central-1.amazonaws.com/message'
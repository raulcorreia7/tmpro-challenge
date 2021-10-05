#!/bin/bash

URL=$1
EMAIL="hello@world.com"
curl -XPOST -H "Content-type: application/json" -d '{ "message" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "delivery" : "email", "target" : "hello@world.com" }' $URL; 
curl -XPOST -H "Content-type: application/json" -d '{ "message" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "delivery" : "sms", "target" : "hello@world.com" }' $URL; echo

curl -XPOST -H "Content-type: application/json" -d '{ "message" : "I dont know boss.", "delivery" : "email", "target" : "asd@world.com" }' $URL; echo
curl -XPOST -H "Content-type: application/json" -d '{ "message" : "I dont know boss.", "delivery" : "sms", "target" : "asd@world.com" }' $URL; echo
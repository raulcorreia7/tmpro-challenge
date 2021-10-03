// eslint-disable-next-line no-unused-vars
const UUID = require('uuid');
const AWS = require('aws-sdk')
const DTO = require('./model/publish-message-dto')

const error = (callback, message) => callback(new Error(message))

exports.handler = async (event, context, callback) => {

  if (event.Records &&
    event.Records[0] &&
    event.Records[0].EventSource === "aws:sns") {

    console.log("We have a sns record to save!")
    // get the object and parse it
    let sns_object = event.Records[0].Sns;
    let sns_message = sns_object.Message;
    let obj_from_string = DTO.parseFromString(sns_message)
    console.log("Message received: " + sns_message);
    // check if it's valid
    if (DTO.isValid(obj_from_string)) {
      console.log("Saving Message.")
      await SaveMessage(obj_from_string, callback)
      console.log("Saved succesfully!");
    } else {
      error(callback, "Invalid data 😥: " + sns_message)
    }
  } else {
    let msg = "Function was called without any records from the queue! Going to sleep!"
    console.log(msg)
  }
}



async function SaveMessage(dto) {
  const timestamp = new Date().getTime();

  const params = {
    // eslint-disable-next-line no-undef
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: UUID.v1(),
      message: dto.message,
      delivery: dto.delivery,
      target: dto.target,
      created: timestamp,
    },
  };

  const dbclient = new AWS.DynamoDB.DocumentClient();
  return dbclient.put(params).promise()
}
// eslint-disable-next-line no-unused-vars
const AWS = require('aws-sdk')
const DTO = require('./model/publish-message-dto')
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' })

const error = (callback, message) => callback(new Error(message))

exports.handler = async (event, context, callback) => {

  if (event.Records &&
    event.Records[0] &&
    event.Records[0].EventSource === "aws:sns") {

    console.log("We have a sns record to send a SMS!")
    // get the object and parse it
    let sns_object = event.Records[0].Sns;
    let sns_message = sns_object.Message;
    let obj_from_string = DTO.parseFromString(sns_message)
    console.log("Message received: " + sns_message);
    // check if it's valid
    if (DTO.isValid(obj_from_string)) {
      console.log("Sendining SMS Message.")
      await sendMessage(obj_from_string, callback)
      console.log("Sent Message succesfully!");
    } else {
      error(callback, "Invalid data 😥: " + sns_message)
    }
  } else {
    let msg = "Function was called without any records from the queue! Going to sleep!"
    console.log(msg)
  }
}



async function sendMessage(dto) {

  const attributes = {
    // eslint-disable-next-line no-undef
    attributes: {
      DefaultSMSType: 'Promotional',
    }
  };

  const params = {
    Message: dto.message,
    PhoneNumber: dto.target
  }

  await SNS.setSMSAttributes(attributes).promise()
  await SNS.publish(message).promise()
}
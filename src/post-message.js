const AWS = require('aws-sdk')
// eslint-disable-next-line no-undef
const TOPIC_ARN = process.env.MESSAGE_TOPIC_ARN
const SNS = new AWS.SNS()
const HTTP = require('./lib/http_response')
const DTO = require('./model/publish-message-dto')
const UTILS = require('./lib/utils')

exports.handler = async (event) => {
  try {
    // Log we received an message
    console.log('We received an event: ' + JSON.stringify(event, null, 2))

    // create message
    let msg = null;

    if (DTO.isValid(event)) {
      console.log("Event is valid event.")
      msg = DTO.parse(event);
    } else {
      msg = parseBody(event, msg)
    }
    if (msg) {
      await publishMessage(msg);
      return HTTP.httpOk("Message was published with success.") // return ok 200
    } else {
      return HTTP.httpError("Invalid parameters, please use: " + DTO.example)
    }

  } catch (err) {
    // if error, log it and return error
    console.log("Failed to send publish message.")
    console.log(err)
    return HTTP.httpError(err)
  }
}

function parseBody(event) {
  let msg = {};
  let objToParse = event;

  if (UTILS.isString(event.body)) {
    console.log("Body is from a string.")
    objToParse = JSON.parse(event.body)
  }

  if (DTO.isValid(objToParse)) {
    console.log("Body is valid.")
    msg = DTO.parse(objToParse)
  }
  return msg
}

// publish a message
async function publishMessage(message) {
  // params of sns publish
  const params = {
    Message: DTO.stringify(message),
    TopicArn: TOPIC_ARN,
    MessageAttributes: {
      delivery: {
        DataType: "String.Array",
        StringValue: JSON.stringify(message.delivery),
      }
    }
  }

  console.log(`Sending message: ${params.Message} to SNS topic : ${TOPIC_ARN}`)

  // try to publish it
  await SNS.publish(params).promise()

  console.log('Published message to SNS: ' + TOPIC_ARN + '\n')
}

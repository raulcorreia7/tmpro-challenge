// eslint-disable-next-line no-unused-vars
const AWS = require('aws-sdk')
const HTTP = require('./lib/http_response')
const UTILS = require('./lib/utils')

exports.handler = async (event) => {
  // Log we received an message
  console.log('We received an event: ' + JSON.stringify(event, null, 2))
  let target = "";
  try {
    target = event.pathParameters.target;

    // get /message/{$target}
    if (UTILS.stringIsNullOrEmpty(target)) {
      return HTTP.httpError("The target cannot be empty.");
    }

    const messages = await GetMessagesFromTarget(target);

    return HTTP.httpOk(UTILS.stringify(messages)) // return ok 200
  } catch (err) {

    // if error, log it and return error
    console.log(`Failed to fetch messages from target : ${target}`)
    console.log(err)
    return HTTP.httpError(err)
  }
}

async function GetMessagesFromTarget(target) {

  console.log("Fetching messages for target : " + target);

  const params = {
    // eslint-disable-next-line no-undef
    TableName: process.env.DYNAMODB_TABLE,
    KeyConditionExpression: "#tg = :value",
    ExpressionAttributeNames: {
      "#tg": "target"
    },
    ExpressionAttributeValues: {
      ":value": target
    }
  };

  const dbclient = new AWS.DynamoDB.DocumentClient();
  const messages = await dbclient.query(params).promise()

  console.log("Fetched the messages : " + UTILS.stringify(messages))

  return messages;
}

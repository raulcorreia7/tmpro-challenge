const AWS = require("aws-sdk")

const TOPIC_NAME = process.env.MESSAGE_TOPIC_NAME
const TOPIC_ARN = process.env.MESSAGE_TOPIC_ARN

const ok_resp = {
  statusCode: 200,
  body: {}
};

const error_resp = {
  statusCode: 400,
  body: {

  }
}
exports.handler = async (event, context, callback) => {
  console.log("We received an post request with message!");

  const sns = new AWS.SNS();
  try {
    let params = {
      Message: `I'm sending a message to the topic! ${TOPIC_NAME}`,
      TopicArn: `${TOPIC_ARN}`
    }
    console.log(`Sending message: ${params} to SNS topic : ${TOPIC_ARN}`)

    await sns.publish(params).promise();

    console.log("Published message to SNS: ", TOPIC_ARN);
    return ok_resp;
  } catch (err) {

    console.log(err);
    error_resp.body = err;

    return error;
  }
};
const AWS = require("aws-sdk")

const TOPIC_NAME = process.env.MESSAGE_TOPIC_NAME
const TOPIC_ARN = process.env.MESSAGE_TOPIC_ARN


exports.handler = async function logic(event, context, callback) {
  console.log("We received an post request with message!");

  const params = {
    Message: `I'm sending a message to the topic! ${TOPIC_NAME}`,
    Subject: "Test SNS from lambda",
    TopicArn: `${TOPIC_ARN}`
  }

  console.log(`Sending message to SNS topic : ${TOPIC_ARN}`)
  const sns = new AWS.SNS();
  return await sns.publish(params, (error, data) => {
    if (error) {
      console.log(`Error pushing to SNS Topic "${TOPIC_ARN}"`)
      callback(error)
    }
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Message successfully published to SNS topic "${TOPIC_NAME}"`,
          input: event,
        },
        null,
        2
      ),
    });
  }).promise();
};
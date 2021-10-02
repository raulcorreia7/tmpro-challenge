
import { AWS } from "aws-sdk";

const sns = new AWS.SNS();

exports.handler = async function logic(event) {
  console.log("We received an post request with message!");

  const params = {
    Message: "I'm sending a message to the topic!",
    Subject: "Test SNS from lambda",
    TopicArn: process.env.topicArn
  }

  console.log(`Sending message to SNS topic : ${process.env.topicArn}`)
  await sns.publish(params).promise();

  console.log("Send to SNS!");

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "We received an post request!",
        input: event,
      },
      null,
      2
    ),
  };
};
exports.handler = async function logic(event) {
  let message = event.Records[0].Sns.Message;
  console.log("Received MESSAGE: " + message);

  return message;
};
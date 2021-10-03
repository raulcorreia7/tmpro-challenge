// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  const message = event.Records[0].Sns.Message
  console.log('Received MESSAGE: ' + message)

  return message
}

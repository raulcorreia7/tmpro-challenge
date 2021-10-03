
exports.handler = async (event) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'We received an send request!',
      input: event
    },
    null,
    2
  )
})

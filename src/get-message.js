
exports.handler = async function logic(event) {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "We received an send request!",
        input: event,
      },
      null,
      2
    ),
  };
};
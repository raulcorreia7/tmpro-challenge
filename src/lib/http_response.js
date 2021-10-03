
/**
 * HTTP Ok
 * @param {*} data Data to be passed in
 * @returns
 */
exports.httpOk = (data) => {
  return {
    statusCode: 200,
    body: data
  }
}

/**
 * HTTP Error (400)
 * @param {*} data Data to be passed in
 * @returns
 */
exports.httpError = (data) => {
  return {
    statusCode: 400,
    body: data
  }
}

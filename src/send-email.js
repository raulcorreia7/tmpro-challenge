const AWS = require('aws-sdk')
const SES = new AWS.SES({ apiVersion: 'latest' })
const UTILS = require('./lib/utils')




exports.handler = async (event) => {

  console.log("Email was sent : " + UTILS.stringify(event))

  /**
   * In pseudo code,
   * Read message,
   * Create corresponding email from 
   * {
   *  Subject:
   *  To:
   *  Body :
   * }
   * 
   * sns.sendEmail(email)
   */

  return Promise.resolve();
}


// /**
//  * Send an e-mail
//  *
//  * @param {string}       subject  The mail title in UTF-8 encoding
//  * @param {string}       body     The mail body in UTF-8 encoding
//  * @return {Promise}     The promise, or null if callback is specified
//  */
// module.exports = function sendEmail (subject, body) {
//   return new Promise((resolve, reject) => {
//     // this must relate to a verified SES account
//     // eslint-disable-next-line no-undef
//     const from = process.env.FROM_NAME + ' <' + process.env.FROM_EMAIL + '>'
//     const params = {
//       Source: from,
//       // eslint-disable-next-line no-undef
//       Destination: { ToAddresses: [ process.env.TO_EMAIL ] },
//       Message: {
//         Subject: {
//           Data: subject,
//           Charset: 'UTF-8'
//         },
//         Body: {
//           Text: {
//             Data: body,
//             Charset: 'UTF-8'
//           }
//         }
//       }
//     }
//     console.log('e-mail params:', params)

//     ses.sendEmail(params, (err, data) => {
//       if (err) {
//         console.error('Failed to send the email:', err.stack || err)
//         reject(err)
//       } else {
//         console.log('e-mail sent:', data)
//         resolve(data)
//       }
//     })
//   })
// }

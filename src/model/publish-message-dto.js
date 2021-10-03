const utils = require('../lib/utils')
/**
 * Publish message DTO
 * 
 * {
 *      "message" : "Lorep ipsum",
 *      "delivery" : "email" or "sms"
 * }
 */

const parameters = ["message", "delivery"]

/**
 * DTO Constructor
 * @param {*} message message of DTO
 * @param {*} delivery Delivery type of DTO (email/sms)
 */

exports.PublishMessageDTO = function PublishMessageDTO(message, delivery) {
    this.message = message;
    this.delivery = delivery;
};

/**
 * Check if a given event contains all required parameters
 * @param {*} event AWS Post event
 * @returns True if contains all DTO Parameters, or false if it doesn't
 */
exports.isValid = (event) => {
    for (const element of parameters) {
        if (utils.stringIsNullOrEmpty(event[element])) {
            return false;
        }
    }
    return true;
}

/**
 * Parses all events parameters into a proper object
 * @param {*} event AWS Post event
 * @returns Publish message DTO
 */
exports.parse = (event) => {
    const obj = new this.PublishMessageDTO(event.message, event.delivery);
    return obj;
}
/**
 * Stringify DTO
 * @param {*} dto object to turn into string
 * @returns string
 */
exports.stringify = (dto) => utils.stringify(dto)
exports.exampleDTO = new this.PublishMessageDTO("Lorep ipsum", "email")
exports.example = this.stringify(this.exampleDTO)
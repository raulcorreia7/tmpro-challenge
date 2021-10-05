const utils = require('../lib/utils')
/**
 * Publish message DTO
 * 
 * {
 *      "message" : "Lorep ipsum",
 *      "delivery" : "email" or "sms",
 *      "target" : "user@user.pt" or "+31123456789"
 * }
 */

const parameters = [
    "message",
    "delivery",
    "target"
]

/**
 * DTO Constructor
 * @param {*} message message of DTO
 * @param {*} delivery Delivery type of DTO (email/sms)
 * @param {*} target Target to deliver the topic to (Phone number or Email address)
 */

exports.PublishMessageDTO = function PublishMessageDTO(message, delivery, target) {
    this.message = message;
    this.delivery = delivery;
    this.target = target
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
 * Check if a given string contains all required parameters
 * @param {*} event AWS Post event
 * @returns True if contains all DTO Parameters, or false if it doesn't
 */
exports.isValidString = (event) => {
    const obj = JSON.parse(data)
    for (const element of parameters) {
        if (utils.stringIsNullOrEmpty(obj[element])) {
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
    const obj = new this.PublishMessageDTO(event.message, event.delivery, event.target);
    return obj;
}
/**
 * Parse an DTO oobject from a given string
 * @param {*} data string with data
 * @returns Publish message DTO
 */
exports.parseFromString = (data) => {
    const obj = JSON.parse(data)
    return this.parse(obj)
}
/**
 * Stringify DTO
 * @param {*} dto object to turn into string
 * @returns string
 */
exports.stringify = (dto) => utils.stringify(dto)
exports.exampleDTO = new this.PublishMessageDTO("Lorep ipsum", "email", "hello@world.com")
exports.example = this.stringify(this.exampleDTO)
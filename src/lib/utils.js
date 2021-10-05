
/**
 * Check if a String is null or empty
 * @param {*} value string 
 * @returns true or false
 */
exports.stringIsNullOrEmpty = (value) => {
  return (typeof value === 'undefined' || value === null)
}
/**
 * Generic stringify a object
 * @param {*} dto object to stringify
 * @returns string
 */
exports.stringify = (dto) => JSON.stringify(dto, null, 2)

/**
 * Checks if a object is a string
 * @param {*} val 
 * @returns 
 */
exports.isString = (val) => {
  return typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}
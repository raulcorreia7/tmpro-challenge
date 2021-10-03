
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
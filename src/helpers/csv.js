const csv = require('csvtojson');

exports.readCSV = async (csvFilePath, options = {}) => {
  const json = await csv(options).fromFile(csvFilePath)

  return json;
}

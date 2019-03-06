const csv = require('csvtojson');

exports.readCSV = async (csvFilePath) => {
  const json = await csv({
      colParser:{
          "lat":{
              flat:true,
              cellParser: "number" // string or a function 
          },
          "lon":{
            flat:true,
            cellParser: "number" // string or a function 
        }

      } 
  }).fromFile(csvFilePath)

  return json;
}

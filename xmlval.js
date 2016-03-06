var fs = require('fs');
var xsd = require('libxml-xsd');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
  fs.readFile(xmlFPath, 'utf8', function onXmlFileRead(err, xmlString) {
    if (err) { return cb(err); }
    parseXsdAndValidateString(xmlString, xsdFPath, cb);
  });
}

function parseXsdAndValidateString(xmlString, xsdFile, cb) {
  xsd.parseFile(xsdFile, function onXsdParsed(err, schema){
    if (err) { return cb(err); }
    validateString(xmlString, schema, cb);
  });
}

function validateString(xmlString, schema, cb) {
  schema.validate(xmlString, function onSchemaValidated(err, validationErrors){
    if (err) { return cb(err); }
    if (validationErrors) { return cb(validationErrors); }
    cb();
  });  
}

var fs = require('fs');
var xsd = require('libxml-xsd');
var _ = require('underscore');

module.exports = validateFile;


function validateFile(xmlFPath, xsdFPath, cb) {
    fs.readFile(xmlFPath, 'utf8',  _.partial(parseXsdAndValidateString, _, _, xsdFPath, cb));
}

function parseXsdAndValidateString(err, xmlString, xsdFile, cb) {
    if (err) { return cb(err); }
    xsd.parseFile(xsdFile,  _.partial(validateString, _, _, xmlString, cb));
}

function validateString(err, schema, xmlString, cb) {
    if (err) { return cb(err); } 
    schema.validate(xmlString, function onSchemaValidated(err, validationErrors){
        if (err) { return cb(err); } 
        if (validationErrors) { return cb(validationErrors); }
        cb();
    });  
}

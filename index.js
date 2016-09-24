var fs = require('fs');
var xsd = require('libxml-xsd');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
    fs.readFile(xmlFPath, 'utf8', cbReadFile);

    function cbReadFile(err, xmlString) {
        if (err) { return cb(err); }
        xsd.parseFile(xsdFPath, (err, schema) => cbParseFile(err, schema, xmlString));
    }

    function cbParseFile(err, schema, xmlString) {
        if (err) { return cb(err); }
        schema.validate(xmlString, cbValidate);  
    }

    function cbValidate(err, validationErrors) {
        if (err) { return cb(err); }
        if (validationErrors) { return cb(validationErrors); }
        cb();
    } 
}

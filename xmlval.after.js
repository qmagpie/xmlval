var fs = require('fs');
var xsd = require('libxml-xsd');
var after = require('after');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
    var next = after(2, validate);
    var results = {};
    
    // console.time('xml validation');
    fs.readFile(xmlFPath, 'utf8', function onXmlFileRead(err, xmlString) {
        if (err) { return next(err); }
        results.xmlString = xmlString;
        next(null, results);
    });
    
    xsd.parseFile(xsdFPath, function onXsdParsed(err, schema){
        if (err) { return next(err); }
        results.schema = schema; 
        next(null, results);
    });
    
    function validate(err, results) {
        if (err) { return cb(err); }
        validateString(results.xmlString, results.schema, cb);
    }
}

function validateString(xmlString, schema, cb) {
    schema.validate(xmlString, function onSchemaValidated(err, validationErrors){
        // console.timeEnd('xml validation');
        if (err) { return cb(err); }
        if (validationErrors) { return cb(validationErrors); }
        cb();
    });  
}

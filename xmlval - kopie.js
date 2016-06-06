var fs = require('fs');
var xsd = require('libxml-xsd');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
<<<<<<< HEAD
    // console.time('xml validation');
=======
    //console.time('xml validation');
>>>>>>> 620ca443344343f95e4920be2cd8909a32e76ba9
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
<<<<<<< HEAD
        // console.timeEnd('xml validation');
=======
        //console.timeEnd('xml validation');
>>>>>>> 620ca443344343f95e4920be2cd8909a32e76ba9
        if (err) { return cb(err); }
        if (validationErrors) { return cb(validationErrors); }
        cb();
    });  
}

var util = require('util');
var fs = require('fs');
var program = require('commander');
var xsd = require('libxml-xsd');
var _ = require('underscore');


var args = process.argv;
if (args.length < 3) { args.push('--help'); }

console.log('xml/xsd validator by rpx');
program
    .version('0.0.1')
    .arguments('<xml-file> <xsd-file>')
    .action(function onCommanderAction(xmlFile, xsdFile) {
        console.log('validating: ' + xmlFile + ' against: ' + xsdFile);
        validateFile(xmlFile, xsdFile, function onValidateFile(err) {
            if (err) {
                console.error('not valid');
                console.error(util.inspect(err, { showHidden: false, depth: null, colors: true }));
                process.exit(0);
            }
            console.log('valid!');
            process.exit(1);
        });
    })
    .parse(args);
    
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

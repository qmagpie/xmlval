'use strict';

var fs = require('fs');
var xsd = require('libxml-xsd');
var after = require('after');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
    var next = after(2, validate);
    var results = {};

    fs.readFile(xmlFPath, 'utf8', cbReadFile);
    xsd.parseFile(xsdFPath, cbParseFile);

    function cbReadFile(err, xmlString) {
        if (err) { return next(err); }
        results.xmlString = xmlString;
        next(null, results);
    }

    function cbParseFile(err, schema) {
        if (err) { return next(err); }
        results.schema = schema; 
        next(null, results);
    }

    function validate(err, results) {
        if (err) { return cb(err); }
        results.schema.validate(results.xmlString, cbValidate);
    }

    function cbValidate(err, validationErrors) {
        if (err) { return cb(err); }
        if (validationErrors) { return cb(validationErrors); }
        cb();
    }
}

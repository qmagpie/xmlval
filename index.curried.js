'use strict';

var fs = require('fs');
var xsd = require('libxml-xsd');
var _ = require('underscore');

module.exports = validateFile;

function validateFile(xmlFPath, xsdFPath, cb) {
    fs.readFile(xmlFPath, 'utf8',  _.partial(cbReadFile, _, _, xsdFPath, cb));
}

function cbReadFile(err, xmlString, xsdFile, cb) {
    if (err) { return cb(err); }
    xsd.parseFile(xsdFile,  _.partial(cbParseFile, _, _, xmlString, cb));
}

function cbParseFile(err, schema, xmlString, cb) {
    if (err) { return cb(err); }
    schema.validate(xmlString, _.partial(cbValidate, _, _, cb));
}

function cbValidate(err, validationErrors, cb){
    if (err) { return cb(err); } 
    if (validationErrors) { return cb(validationErrors); }
    cb();
}

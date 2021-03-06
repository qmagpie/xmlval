#!/usr/bin/env node

'use strict';

var xmlvalidate = require('./');
// var xmlvalidate = require('./index.after');
// var xmlvalidate = require('./index.curried');
var util = require('util');
var program = require('commander');
var pjson = require('./package.json');

var args = process.argv;
if (args.length < 3) { args.push('--help'); }

console.log('xml/xsd validator by qmagpie');
program
    .version(pjson.version)
    .arguments('<xml-file> <xsd-file>')
    .action(onCommanderAction)
    .parse(args);

function onCommanderAction(xmlFile, xsdFile) {
    console.log('validating: ' + xmlFile + ' against: ' + xsdFile);
    xmlvalidate(xmlFile, xsdFile, cbXmlValidate);
}

function cbXmlValidate(err) {
    if (err) {
        console.error('not valid');
        console.error(util.inspect(err, { showHidden: false, depth: null, colors: true }));
        process.exit(0);
        return;
    }
    console.log('valid!');
    process.exit(1);
}
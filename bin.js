#!/usr/bin/env node

var xmlvalidate = require('./');
var util = require('util');
var program = require('commander');

var args = process.argv;
if (args.length < 3) { args.push('--help'); }

console.log('xml/xsd validator by qmagpie');
program
    .version('0.0.1')
    .arguments('<xml-file> <xsd-file>')
    .action(function onCommanderAction(xmlFile, xsdFile) {
        console.log('validating: ' + xmlFile + ' against: ' + xsdFile);
        xmlvalidate(xmlFile, xsdFile, function onValidateFile(err) {
            if (err) {
                console.error('not valid');
                console.error(util.inspect(err, { showHidden: false, depth: null, colors: true }));
                process.exit(0);
                return;
            }
            console.log('valid!');
            process.exit(1);
        });
    })
    .parse(args);

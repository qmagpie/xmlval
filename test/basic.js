var xmlval = require('../');
var t = require('tap');
var fs = require('fs');

var SCHEMA = __dirname + '/' + 'Command.xsd';
var SAMPLE_OK = __dirname + '/' + 'CommandSample.xml';
var SAMPLE_BAD = __dirname + '/' + 'CommandSampleBad.xml';
var SAMPLE_BAD2 = __dirname + '/' + 'CommandSampleBad2.xml';

t.test('check files', function (t) {
  t.ok(fs.statSync(SCHEMA).isFile());
  t.ok(fs.statSync(SAMPLE_OK).isFile());
  t.ok(fs.statSync(SAMPLE_BAD).isFile());
  t.ok(fs.statSync(SAMPLE_BAD2).isFile());
  t.end();
});

t.test('validate ok sample', function (t) {
  xmlval(SAMPLE_OK, SCHEMA, function(err) {
    t.false(err);  
    t.end();
  });
});

t.test('validate bad sample', function (t) {
  xmlval(SAMPLE_BAD, SCHEMA, function(err) {
    t.true(err);
    t.isEqual(err[0].message, "Element 'iXPareter': This element is not expected. Expected is ( iXParameter ).\n");  
    t.end();
  });
});

t.test('validate bad sample 2', function (t) {
  xmlval(SAMPLE_BAD2, SCHEMA, function(err) {
    t.true(err);
    t.isEqual(err.message, "Opening and ending tag mismatch: iXPareter line 3 and iXParameter\n");  
    t.end();
  });
});
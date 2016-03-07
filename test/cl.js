var t = require('tap');
var fs = require('fs');
var spawn = require('child_process').spawn;
var node = process.execPath;

var EXEJS = './bin.js';
var SCHEMA = __dirname + '/' + 'Command.xsd';
var SAMPLE_OK = __dirname + '/' + 'CommandSample.xml';
var SAMPLE_BAD = __dirname + '/' + 'CommandSampleBad.xml';

t.test('check files', function (t) {
  t.ok(fs.statSync(SCHEMA).isFile());
  t.ok(fs.statSync(SAMPLE_OK).isFile());
  t.ok(fs.statSync(SAMPLE_BAD).isFile());
  t.end();
});

t.test('cl no params', function (t) {
  var child = spawn(node, [EXEJS], {
    stdio: [ 0, 'pipe', 'pipe' ],
    env: {}
  });
  var found = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (c) {
    found += c;
  });
  child.stderr.on('data', function (c) {
    found += c;
  });
  child.on('close', function (code) {
    t.isEqual(code, 0);
    var lines = found.split('\n');
    t.isEqual(lines[2], '  Usage: bin [options] <xml-file> <xsd-file>');
    t.end();
  });
});

t.test('cl only 1 param', function (t) {
  var child = spawn(node, [EXEJS, SAMPLE_OK], {
    stdio: [ 0, 'pipe', 'pipe' ],
    env: {}
  });
  var found = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (c) {
    found += c;
  });
  child.stderr.on('data', function (c) {
    found += c;
  });
  child.on('close', function (code) {
    t.isEqual(code, 1);
    var lines = found.split('\n');
    t.isEqual(lines[2], '  error: missing required argument `xsd-file\'');
    t.end();
  });
});

t.test('cl validate ok sample', function (t) {
  var child = spawn(node, [EXEJS, SAMPLE_OK, SCHEMA], {
    stdio: [ 0, 'pipe', 'pipe' ],
    env: {}
  });
  var found = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (c) {
    found += c;
  });
  child.stderr.on('data', function (c) {
    found += c;
  });
  child.on('close', function (code) {
    t.isEqual(code, 1);
    var lines = found.split('\n');
    t.isEqual(lines[2], 'valid!');
    t.end();
  });
});

t.test('cl validate bad sample', function (t) {
  var child = spawn(node, [EXEJS, SAMPLE_BAD, SCHEMA], {
    stdio: [ 0, 'pipe', 'pipe' ],
    env: {}
  });
  var found = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (c) {
    found += c;
  });
  child.stderr.on('data', function (c) {
    found += c;
  });
  child.on('close', function (code) {
    t.isEqual(code, 0);
    var lines = found.split('\n');
    t.isEqual(lines[2], 'not valid');
    t.end();
  });
});


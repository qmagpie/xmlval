var t = require('tap');
var fs = require('fs');
var spawn = require('child_process').spawn;
var node = process.execPath;


var EXEJS = './xmlval.js';
var SCHEMA = __dirname + '/' + 'Command.xsd';
var SAMPLE_OK = __dirname + '/' + 'CommandSample.xml';
var SAMPLE_BAD = __dirname + '/' + 'CommandSampleBad.xml';

t.test('check files', function (t) {
    t.ok(fs.statSync(SCHEMA).isFile());
    t.ok(fs.statSync(SAMPLE_OK).isFile());
    t.ok(fs.statSync(SAMPLE_BAD).isFile());
    t.end();
});

testSpawnedOutput(t, 'cl no params', [EXEJS], function(code, outLines, t) {
    t.isEqual(code, 0);
    t.isEqual(outLines[2], '  Usage: xmlval [options] <xml-file> <xsd-file>');
    t.end();
});

testSpawnedOutput(t, 'cl only 1 param', [EXEJS, SAMPLE_OK], function(code, outLines, t) {
    t.isEqual(code, 1);
    t.isEqual(outLines[2], '  error: missing required argument `xsd-file\'');
    t.end();
});

testSpawnedOutput(t, 'cl validate ok sample', [EXEJS, SAMPLE_OK, SCHEMA], function(code, outLines, t) {
    t.isEqual(code, 1);
    t.isEqual(outLines[2], 'valid!');
    t.end();
});

testSpawnedOutput(t, 'cl validate bad sample', [EXEJS, SAMPLE_BAD, SCHEMA], function(code, outLines, t) {
    t.isEqual(code, 0);
    t.isEqual(outLines[2], 'not valid');
    t.end();
});

function testSpawnedOutput(t, desc, jsExeArgs, cb) {
    t.test(desc, function (t) {
        var child = spawn(node, jsExeArgs, {
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
            if (cb) {
                cb(code, found.split('\n'), t);
            }
        });
    });
}


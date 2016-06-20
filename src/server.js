var express = require('express');
var fs = require('fs');
var app = express();
var json = require('json');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var cors = require('cors');

var whitelist = ['http://ruml.io', 'http://alpha.ruml.io'];
// ruby installed? implement check
devMode = false;
if (process.argv[2] == "development") {
	devMode = true;
}
if (devMode) {
	app.use(express.static(__dirname + '/public'));
	console.log("true");
}
app.use(bodyParser.urlencoded({
	extended: true
}));

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

var corsOptions = {
	origin: function(origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		if (devMode) {
			originIsWhitelisted = true;
		}
		callback(null, originIsWhitelisted);
	}
};

app.post('/', cors(corsOptions), function(req, res) {
	var code = req.body.code;
	if (!code) {
		res.end("EMPTY ERROR");
		return;
	}
	if (code.indexOf("ClassDiagram") > -1) {
		code = "require '" + __dirname + "/rb/_class.rb' \n" + code;
	} else if (code.indexOf("ComponentDiagram") > -1) {
		code = "require '" + __dirname + "/rb/_cmp.rb' \n" + code;
	} else if (code.indexOf("UseCaseDiagram") > -1) {
		code = "require '" + __dirname + "/rb/_ucd.rb' \n" + code;
	}
	code = replaceAll(code, '"', '\\"');
	code = code.replace(/(\r\n|\n|\r)/gm, "\" -e \"");
	var execcode = 'ruby -e "' + code + '"';
	exec(execcode, function(error, stdout, stderr) {
		if (error) {
			res.end("RUBY ERROR! ERROR: " + error + " STDERR: " + stderr + "STDOUT: " + stdout);
		} else if (stdout) {
			res.end(stdout);
		} else {
			res.end("EMPTY ERROR");
		}
	});
});
port = 3000;
if (process.argv[2] >= 1 && process.argv[2] <= 65535) {
	port = process.argv[2];
}
app.listen(port);
console.log('Listening at ' + port + '. You can pass a port number as an argument: \'node server.js 1234\'');

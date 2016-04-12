//require('events').EventEmitter.prototype._maxListeners = 0;
//http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters-in-express
//http://stackoverflow.com/questions/2496710/writing-files-in-node-js
//http://stackoverflow.com/questions/1494492/graphviz-how-to-go-from-dot-to-a-graph
//http://stackoverflow.com/questions/10802312/display-png-image-as-response-to-jquery-ajax-request
//http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
// wichtig: http://stackoverflow.com/questions/10232192/exec-display-stdout-live
// wichtiger: http://stackoverflow.com/questions/13230370/nodejs-child-process-write-to-stdin-from-an-already-initialised-process
var express = require('express');
var fs = require('fs');
var app = express();
var json = require('json');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

app.post('/', function(req, res) {
	var code = req.body.code;
	if (!code) {
		res.end("EMPTY ERROR");
		return;
	}
	code = "require './dist/_class.rb' \n" + code;
	code = replaceAll(code, '"', '\\"');
	code = code.replace(/(\r\n|\n|\r)/gm, "\" -e \"");
	var execcode = 'ruby -e "' + code + '"';
	exec(execcode, function(error, stdout, stderr) {
		if (error) {
			res.end("RUBY ERROR!");
		} else if (stdout) {
			res.end(stdout);
		} else {
			res.end("EMPTY ERROR");
		}
	});
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);

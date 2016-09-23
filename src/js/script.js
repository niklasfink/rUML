var $ = require('jquery');
var helper = require('./helperfunctions.js');
var CodeMirror = require('../../node_modules/codemirror/lib/codemirror.js');
require('../../node_modules/codemirror/mode/ruby/ruby.js');
helper(window); //init

$(document).ready(function() {
	var gotlast = true;
	//  _______ _______ __   _ ______   ______ _     _ ______  __   __
	//  |______ |______ | \  | |     \ |_____/ |     | |_____]   \_/
	//  ______| |______ |  \_| |_____/ |    \_ |_____| |_____]    |
	// checks if keyword is present and sends data to the server.
	// on positive answer, a graph is generated through viz.js
	// on negative answer, an error message is shown
	var doit = function(e) {

		var transpile = Opal.compile(editor.getValue());
		var standardlog = window.console.log;
		var output = "";
		try {
			// Capture puts sentences
			window.console.log = function(msg) {
				output += msg;
			};
			res = eval(transpile);
		} catch (compiled_error) {
			error = compiled_error.message;
		}
		// Return to normal console
		window.console.log = standardlog;
		//var output = eval(transpile);
		console.log("Output:");
		console.log(output);
		if (output) {
			$("#graph_container").html(Viz(output, {
				format: $('#outputformat :selected').val()
			}));
		}
		/* if (e) e.preventDefault();
		if (gotlast) {
			var editorvalue = editor.getValue();
			if (editorvalue.indexOf("ClassDiagram") > -1 || editorvalue.indexOf("UseCaseDiagram") > -1 || editorvalue.indexOf("ComponentDiagram") > -1) {
				gotlast = false;
				$.ajax({
					type: 'POST',
					url: 'http://localhost:3000/',
					data: {
						'code': editorvalue
					},
					error: function() {
						alert("Error occured! Try again");
					},
					success: function(data) {
						$("#error").text("");
						if (data.indexOf("ERROR") > -1 && !gotlast) {
							//alert(data);
							// should be an error textfield / snackbar
						} else {
							$("#graph_container").html(Viz(data, {
								format: $('#outputformat :selected').val()
							}));
						}
						gotlast = true;
					}
				});
			}
		}*/
	};
	$("#go").click(doit);

	//  _______  _____  ______  _______ _______ _____  ______  ______  _____   ______
	//  |       |     | |     \ |______ |  |  |   |   |_____/ |_____/ |     | |_____/
	//  |_____  |_____| |_____/ |______ |  |  | __|__ |    \_ |    \_ |_____| |    \_
	// enables the codemirror texteditor
	var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
		lineNumbers: true,
		mode: "ruby",
		extraKeys: {
			'Ctrl-Space': 'autocomplete'
		}
	});
	editor.on('change', function() {
		doit();
	});

	//  ______  _______ __   _      _______ __   _ _____ _______ _______ _______ _____  _____  __   _
	//  |_____]    |    | \  |      |_____| | \  |   |   |  |  | |_____|    |      |   |     | | \  |
	//  |_____]    |    |  \_|      |     | |  \_| __|__ |  |  | |     |    |    __|__ |_____| |  \_|
	$("#saveruby").click(function() {
		if ($("#savedialog").width() == 200) {
			$("#savedialog").animate({
				width: 200
			});
		} else {
			$("#savedialog").animate({
				width: 200
			});
		}
		$("#loaduml").animate({
			width: 0
		});

	});
	$("#load").click(function() {
		if ($("#savedrumls").width() == 220) {
			$("#savedrumls").animate({
				width: 0
			});
		} else {
			$("#savedrumls").animate({
				width: 220
			});
		}
	});

	//          _____  _______ ______  _     _ _______        _______
	//  |      |     | |_____| |     \ |     | |  |  | |      |______
	//  |_____ |_____| |     | |_____/ |_____| |  |  | |_____ ______|
	// load saved rUMLs from localStorage and decode code
	var loadUMLlist = function() {
		var umls = [];
		if (!localStorage.getItem("rubycode")) {
			return;
		}
		var loadedUmls = CSVToArray(localStorage.getItem("rubycode"), ";")[0];
		for (i = 0; i < loadedUmls.length; i++) {
			var uml = CSVToArray(loadedUmls[i], ":")[0];
			umls.push({
				name: uml[0],
				code: Base64.decode(uml[1])
			});
		}
		$("#savedrumls").html("");
		for (i = 0; i < umls.length; i++) {
			$("<option/>").val(umls[i].code).text(umls[i].name).appendTo("#savedrumls");
		}
	};
	loadUMLlist();

	$("#savedrumls").on('change', function() {
		editor.setValue(this.value);
		doit();
	});

	//  _______ _______ _    _ _______ _     _ _______
	//  |______ |_____|  \  /  |______ |     | |  |  | |
	//  ______| |     |   \/   |______ |_____| |  |  | |_____
	// save UML to localStorage and encode code with base64
	var saveUML = function() {
		var encodedString = Base64.encode(editor.getValue());
		var name = $("#savetext").val() || "Diagram";
		var temp = localStorage.getItem("rubycode") ? ";" + localStorage.getItem("rubycode") : "";
		localStorage.setItem("rubycode", name + ":" + encodedString + (temp || ""));
		loadUMLlist();
		$("#savedialog").animate({
			width: 0
		});
		$("#savetext").val("");
	};

	$("#savebtn").click(function() {
		saveUML();
	});

	$('#savetext').keypress(function(e) {
		if (e.which == 13) {
			saveUML();
			return false;
		}
	});

	function mySnackbar() {
		// Get the snackbar DIV
		var x = document.getElementById("snackbar");

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		setTimeout(function() {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
});

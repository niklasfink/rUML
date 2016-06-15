var $ = require('jquery');
var helper = require('./helperfunctions.js');
var CodeMirror = require('../../node_modules/codemirror/lib/codemirror.js');
require('../../node_modules/codemirror/mode/ruby/ruby.js');
helper(window); //init

$(document).ready(function() {
	var gotlast = true;
	var doit = function(e) {
		if (e) e.preventDefault();
		if (gotlast) {
			var editorvalue = editor.getValue();
			if (editorvalue.indexOf("ClassDiagram") > -1 || editorvalue.indexOf("UseCaseDiagram") > -1 || editorvalue.indexOf("ComponentDiagram") > -1) {
				gotlast = false;
				$("#graph_container").animate({
					opacity: 0.0
				}, 200);
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
							alert(data);
							// should be an error textfield / snackbar
						} else {
							$("#graph_container").html(Viz(data, {
								format: $('#outputformat :selected').val()
							}));
							$("#graph_container").animate({
								opacity: 1.0
							}, 100);
						}
						gotlast = true;
					}
				});
			}
		}
	};
	$("#go").click(doit);

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

	$("#savebtn").click(function() {
		$("#savetext").animate({
			padding: "0 10 0 10",
			width: 125
		});
		$("#saveicon").animate({
			width: 40
		});
		$("#loaduml").animate({
			width: 0
		});

	});

	$("#load").click(function() {
		$("#loaduml").animate({
			width: 175
		});
		$("#savetext").animate({
			padding: 0,
			width: 0

		});
		$("#saveicon").animate({
			width: 0
		});

		editor.setValue($('#savedrumls :selected').val());
		doit();
	});

	var loadUMLlist = function() {
		var umls = [];
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

	$("#save").click(function() {
		var encodedString = Base64.encode(editor.getValue());
		var name = prompt("Please enter rUML diagram name:", "");
		var temp = localStorage.getItem("rubycode") ? ";" + localStorage.getItem("rubycode") : "";
		localStorage.setItem("rubycode", name + ":" + encodedString + (temp || ""));
		loadUMLlist();
	});

	function mySnackbar() {
		// Get the snackbar DIV
		var x = document.getElementById("snackbar")

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		setTimeout(function() {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
});

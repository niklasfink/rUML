var $ = require('jquery');
var helper = require('./helperfunctions.js');
//var CodeMirror = require('./codemirror-compressed.js');
helper(window); //init

var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
	lineNumbers: true,
	mode: "ruby",
});

var gotlast = true;
var doit = function(e) {
	if (gotlast) {
		gotlast = false;
		$("#graph_container").animate({
			opacity: 0.0
		}, 200);
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/',
			data: {
				'code': editor.getValue()
			},
			error: function() {
				alert("Error occured! Try again");
			},
			success: function(data) {
				$("#error").text("");
				if (data.indexOf("ERROR") > -1 && !gotlast) {
					alert(data);
					// should be an error textfield
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
		e.preventDefault();
	}
};
$("#go").click(doit);
// $("#editor").keyup(doit);

$("#load").click(function() {
	editor.setValue($('#savedrumls :selected').val());
	doit();
});

//$("<option/>").val(name).text(name).appendTo("#savedrumls");
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
	// Encode the String
	var encodedString = Base64.encode(editor.getValue());
	var name = prompt("Please enter rUML diagram name:", "");
	var temp = localStorage.getItem("rubycode") ? ";" + localStorage.getItem("rubycode") : "";
	localStorage.setItem("rubycode", name + ":" + encodedString + (temp || ""));
	loadUMLlist();
	// Decode the String
	//var decodedString = Base64.decode(encodedString);
});

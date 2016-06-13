var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN(r)) {
				u = a = 64;
			} else if (isNaN(i)) {
				a = 64;
			}
			t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
		}
		return t;
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "");
		while (f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if (u != 64) {
				t = t + String.fromCharCode(r);
			}
			if (a != 64) {
				t = t + String.fromCharCode(i);
			}
		}
		t = Base64._utf8_decode(t);
		return t;
	},
	_utf8_encode: function(e) {
		e = e.replace(/rn/g, "n");
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode(r >> 6 | 192);
				t += String.fromCharCode(r & 63 | 128);
			} else {
				t += String.fromCharCode(r >> 12 | 224);
				t += String.fromCharCode(r >> 6 & 63 | 128);
				t += String.fromCharCode(r & 63 | 128);
			}
		}
		return t;
	},
	_utf8_decode: function(e) {
		var t = "";
		var n = 0;
		var r = c1 = c2 = 0;
		while (n < e.length) {
			r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
				n++;
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
				n += 2;
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3;
			}
		}
		return t;
	}
};

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

function CSVToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
	);

	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec(strData)) {

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		) {

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push([]);

		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(
				new RegExp("\"\"", "g"),
				"\""
			);

		} else {

			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];

		}

		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	// Return the parsed data.
	return (arrData);
}

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
		$("<option/>").val(umls[i].name).text(umls[i].name).appendTo("#savedrumls");
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

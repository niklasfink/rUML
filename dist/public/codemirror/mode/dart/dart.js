!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../clike/clike")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../clike/clike"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},n=0;n<e.length;++n)t[e[n]]=!0;return t}function n(e){(e.interpolationStack||(e.interpolationStack=[])).push(e.tokenize)}function i(e){return(e.interpolationStack||(e.interpolationStack=[])).pop()}function r(e){return e.interpolationStack?e.interpolationStack.length:0}function o(e,t,i,r){function o(t,i){for(var o=!1;!t.eol();){if(!r&&!o&&"$"==t.peek())return n(i),i.tokenize=a,"string";var l=t.next();if(l==e&&!o&&(!c||t.match(e+e))){i.tokenize=null;break}o=!r&&!o&&"\\"==l}return"string"}var c=!1;if(t.eat(e)){if(!t.eat(e))return"string";c=!0}return i.tokenize=o,o(t,i)}function a(e,t){return e.eat("$"),e.eat("{")?t.tokenize=null:t.tokenize=c,null}function c(e,t){return e.eatWhile(/[\w_]/),t.tokenize=i(t),"variable"}function l(e){return function(t,n){for(var i;i=t.next();){if("*"==i&&t.eat("/")){if(1==e){n.tokenize=null;break}return n.tokenize=l(e-1),n.tokenize(t,n)}if("/"==i&&t.eat("*"))return n.tokenize=l(e+1),n.tokenize(t,n)}return"comment"}}var u="this super static final const abstract class extends external factory implements get native operator set typedef with enum throw rethrow assert break case continue default in return new deferred async await try catch finally do else for if switch while import library export part of show hide is as".split(" "),f="try catch finally do else for if switch while".split(" "),s="true false null".split(" "),k="void bool num int double dynamic var String".split(" ");e.defineMIME("application/dart",{name:"clike",keywords:t(u),blockKeywords:t(f),builtin:t(k),atoms:t(s),hooks:{"@":function(e){return e.eatWhile(/[\w\$_\.]/),"meta"},"'":function(e,t){return o("'",e,t,!1)},'"':function(e,t){return o('"',e,t,!1)},r:function(e,t){var n=e.peek();return"'"==n||'"'==n?o(e.next(),e,t,!0):!1},"}":function(e,t){return r(t)>0?(t.tokenize=i(t),null):!1},"/":function(e,t){return e.eat("*")?(t.tokenize=l(1),t.tokenize(e,t)):!1}}}),e.registerHelper("hintWords","application/dart",u.concat(s).concat(k)),e.defineMode("dart",function(t){return e.getMode(t,"application/dart")},"clike")});
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){function e(t,e){for(var r=0,n=t.length;n>r;++r)e(t[r])}function r(t,e){if(!Array.prototype.indexOf){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1}return-1!=t.indexOf(e)}function n(e,r,n,i){var o=e.getCursor(),s=n(e,o);if(!/\b(?:string|comment)\b/.test(s.type)){s.state=t.innerMode(e.getMode(),s.state).state,/^[\w$_]*$/.test(s.string)?s.end>o.ch&&(s.end=o.ch,s.string=s.string.slice(0,o.ch-s.start)):s={start:o.ch,end:o.ch,string:"",state:s.state,type:"."==s.string?"property":null};for(var f=s;"property"==f.type;){if(f=n(e,l(o.line,f.start)),"."!=f.string)return;if(f=n(e,l(o.line,f.start)),!c)var c=[];c.push(f)}return{list:a(s,c,r,i),from:l(o.line,s.start),to:l(o.line,s.end)}}}function i(t,e){return n(t,u,function(t,e){return t.getTokenAt(e)},e)}function o(t,e){var r=t.getTokenAt(e);return e.ch==r.start+1&&"."==r.string.charAt(0)?(r.end=r.start,r.string=".",r.type="property"):/^\.[\w$_]*$/.test(r.string)&&(r.type="property",r.start++,r.string=r.string.replace(/\./,"")),r}function s(t,e){return n(t,d,o,e)}function a(t,n,i,o){function s(t){0!=t.lastIndexOf(u,0)||r(l,t)||l.push(t)}function a(t){"string"==typeof t?e(f,s):t instanceof Array?e(c,s):t instanceof Function&&e(p,s);for(var r in t)s(r)}var l=[],u=t.string,d=o&&o.globalScope||window;if(n&&n.length){var g,h=n.pop();for(h.type&&0===h.type.indexOf("variable")?(o&&o.additionalContext&&(g=o.additionalContext[h.string]),o&&o.useGlobalScope===!1||(g=g||d[h.string])):"string"==h.type?g="":"atom"==h.type?g=1:"function"==h.type&&(null==d.jQuery||"$"!=h.string&&"jQuery"!=h.string||"function"!=typeof d.jQuery?null!=d._&&"_"==h.string&&"function"==typeof d._&&(g=d._()):g=d.jQuery());null!=g&&n.length;)g=g[n.pop().string];null!=g&&a(g)}else{for(var y=t.state.localVars;y;y=y.next)s(y.name);for(var y=t.state.globalVars;y;y=y.next)s(y.name);o&&o.useGlobalScope===!1||a(d),e(i,s)}return l}var l=t.Pos;t.registerHelper("hint","javascript",i),t.registerHelper("hint","coffeescript",s);var f="charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),c="length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),p="prototype apply call bind".split(" "),u="break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(" "),d="and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")});
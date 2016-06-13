!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],e):e(CodeMirror)}(function(e){"use strict";function o(e,o){return"string"==typeof e?e=new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),o?"gi":"g"):e.global||(e=new RegExp(e.source,e.ignoreCase?"gi":"g")),{token:function(o){e.lastIndex=o.pos;var n=e.exec(o.string);return n&&n.index==o.pos?(o.pos+=n[0].length||1,"searching"):void(n?o.pos=n.index:o.skipToEnd())}}}function n(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null}function t(e){return e.state.search||(e.state.search=new n)}function r(e){return"string"==typeof e&&e==e.toLowerCase()}function i(e,o,n){return e.getSearchCursor(o,n,r(o))}function a(e,o,n,t){e.openDialog(o,t,{value:n,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){y(e)}})}function c(e,o,n,t,r){e.openDialog?e.openDialog(o,r,{value:t,selectValueOnOpen:!0}):r(prompt(n,t))}function s(e,o,n,t){e.openConfirm?e.openConfirm(o,t):confirm(n)&&t[0]()}function l(e){return e.replace(/\\(.)/g,function(e,o){return"n"==o?"\n":"r"==o?"\r":o})}function u(e){var o=e.match(/^\/(.*)\/([a-z]*)$/);if(o)try{e=new RegExp(o[1],-1==o[2].indexOf("i")?"":"i")}catch(n){}else e=l(e);return("string"==typeof e?""==e:e.test(""))&&(e=/x^/),e}function f(e,n,t){n.queryText=t,n.query=u(t),e.removeOverlay(n.overlay,r(n.query)),n.overlay=o(n.query,r(n.query)),e.addOverlay(n.overlay),e.showMatchesOnScrollbar&&(n.annotate&&(n.annotate.clear(),n.annotate=null),n.annotate=e.showMatchesOnScrollbar(n.query,r(n.query)))}function p(o,n,r){var i=t(o);if(i.query)return d(o,n);var s=o.getSelection()||i.lastQuery;if(r&&o.openDialog){var l=null;a(o,h,s,function(n,t){e.e_stop(t),n&&(n!=i.queryText&&f(o,i,n),l&&(l.style.opacity=1),d(o,t.shiftKey,function(e,n){var t;n.line<3&&document.querySelector&&(t=o.display.wrapper.querySelector(".CodeMirror-dialog"))&&t.getBoundingClientRect().bottom-4>o.cursorCoords(n,"window").top&&((l=t).style.opacity=.4)}))})}else c(o,h,"Search for:",s,function(e){e&&!i.query&&o.operation(function(){f(o,i,e),i.posFrom=i.posTo=o.getCursor(),d(o,n)})})}function d(o,n,r){o.operation(function(){var a=t(o),c=i(o,a.query,n?a.posFrom:a.posTo);(c.find(n)||(c=i(o,a.query,n?e.Pos(o.lastLine()):e.Pos(o.firstLine(),0)),c.find(n)))&&(o.setSelection(c.from(),c.to()),o.scrollIntoView({from:c.from(),to:c.to()},20),a.posFrom=c.from(),a.posTo=c.to(),r&&r(c.from(),c.to()))})}function y(e){e.operation(function(){var o=t(e);o.lastQuery=o.query,o.query&&(o.query=o.queryText=null,e.removeOverlay(o.overlay),o.annotate&&(o.annotate.clear(),o.annotate=null))})}function m(e,o,n){e.operation(function(){for(var t=i(e,o);t.findNext();)if("string"!=typeof o){var r=e.getRange(t.from(),t.to()).match(o);t.replace(n.replace(/\$(\d)/g,function(e,o){return r[o]}))}else t.replace(n)})}function g(e,o){if(!e.getOption("readOnly")){var n=e.getSelection()||t(e).lastQuery,r=o?"Replace all:":"Replace:";c(e,r+v,r,n,function(n){n&&(n=u(n),c(e,x,"Replace with:","",function(t){if(t=l(t),o)m(e,n,t);else{y(e);var r=i(e,n,e.getCursor()),a=function(){var o,l=r.from();!(o=r.findNext())&&(r=i(e,n),!(o=r.findNext())||l&&r.from().line==l.line&&r.from().ch==l.ch)||(e.setSelection(r.from(),r.to()),e.scrollIntoView({from:r.from(),to:r.to()}),s(e,q,"Replace?",[function(){c(o)},a,function(){m(e,n,t)}]))},c=function(e){r.replace("string"==typeof n?t:t.replace(/\$(\d)/g,function(o,n){return e[n]})),a()};a()}}))})}}var h='Search: <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',v=' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',x='With: <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',q="Replace? <button>Yes</button> <button>No</button> <button>All</button> <button>Stop</button>";e.commands.find=function(e){y(e),p(e)},e.commands.findPersistent=function(e){y(e),p(e,!1,!0)},e.commands.findNext=p,e.commands.findPrev=function(e){p(e,!0)},e.commands.clearSearch=y,e.commands.replace=g,e.commands.replaceAll=function(e){g(e,!0)}});
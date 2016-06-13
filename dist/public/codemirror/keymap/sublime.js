!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],e):e(CodeMirror)}(function(e){"use strict";function t(t,n,r){if(0>r&&0==n.ch)return t.clipPos(h(n.line-1));var o=t.getLine(n.line);if(r>0&&n.ch>=o.length)return t.clipPos(h(n.line+1,0));for(var i,a="start",l=n.ch,s=0>r?0:o.length,c=0;l!=s;l+=r,c++){var f=o.charAt(0>r?l-1:l),u="_"!=f&&e.isWordChar(f)?"w":"o";if("w"==u&&f.toUpperCase()==f&&(u="W"),"start"==a)"o"!=u&&(a="in",i=u);else if("in"==a&&i!=u){if("w"==i&&"W"==u&&0>r&&l--,"W"==i&&"w"==u&&r>0){i="w";continue}break}}return h(n.line,l)}function n(e,n){e.extendSelectionsBy(function(r){return e.display.shift||e.doc.extend||r.empty()?t(e.doc,r.head,n):0>n?r.from():r.to()})}function r(t,n){return t.isReadOnly()?e.Pass:void t.operation(function(){for(var e=t.listSelections().length,r=[],o=-1,i=0;e>i;i++){var a=t.listSelections()[i].head;if(!(a.line<=o)){var l=h(a.line+(n?0:1),0);t.replaceRange("\n",l,null,"+insertLine"),t.indentLine(l.line,null,!0),r.push({head:l,anchor:l}),o=a.line+1}}t.setSelections(r)})}function o(t,n){for(var r=n.ch,o=r,i=t.getLine(n.line);r&&e.isWordChar(i.charAt(r-1));)--r;for(;o<i.length&&e.isWordChar(i.charAt(o));)++o;return{from:h(n.line,r),to:h(n.line,o),word:i.slice(r,o)}}function i(e){var t=e.getCursor(),n=e.scanForBracket(t,-1);if(n)for(;;){var r=e.scanForBracket(t,1);if(!r)return;if(r.ch==g.charAt(g.indexOf(n.ch)+1))return e.setSelection(h(n.pos.line,n.pos.ch+1),r.pos,!1),!0;t=h(r.pos.line,r.pos.ch+1)}}function a(t,n){if(t.isReadOnly())return e.Pass;for(var r,o=t.listSelections(),i=[],a=0;a<o.length;a++){var l=o[a];if(!l.empty()){for(var s=l.from().line,c=l.to().line;a<o.length-1&&o[a+1].from().line==c;)c=l[++a].to().line;i.push(s,c)}}i.length?r=!0:i.push(t.firstLine(),t.lastLine()),t.operation(function(){for(var e=[],o=0;o<i.length;o+=2){var a=i[o],l=i[o+1],s=h(a,0),c=h(l),f=t.getRange(s,c,!1);n?f.sort():f.sort(function(e,t){var n=e.toUpperCase(),r=t.toUpperCase();return n!=r&&(e=n,t=r),t>e?-1:e==t?0:1}),t.replaceRange(f,s,c),r&&e.push({anchor:s,head:c})}r&&t.setSelections(e,0)})}function l(t,n){t.operation(function(){for(var r=t.listSelections(),i=[],a=[],l=0;l<r.length;l++){var s=r[l];s.empty()?(i.push(l),a.push("")):a.push(n(t.getRange(s.from(),s.to())))}t.replaceSelections(a,"around","case");for(var c,l=i.length-1;l>=0;l--){var s=r[i[l]];if(!(c&&e.cmpPos(s.head,c)>0)){var f=o(t,s.head);c=f.from,t.replaceRange(n(f.word),f.from,f.to)}}})}function s(t){var n=t.getCursor("from"),r=t.getCursor("to");if(0==e.cmpPos(n,r)){var i=o(t,n);if(!i.word)return;n=i.from,r=i.to}return{from:n,to:r,query:t.getRange(n,r),word:i}}function c(e,t){var n=s(e);if(n){var r=n.query,o=e.getSearchCursor(r,t?n.to:n.from);(t?o.findNext():o.findPrevious())?e.setSelection(o.from(),o.to()):(o=e.getSearchCursor(r,t?h(e.firstLine(),0):e.clipPos(h(e.lastLine()))),(t?o.findNext():o.findPrevious())?e.setSelection(o.from(),o.to()):n.word&&e.setSelection(n.from,n.to))}}var f=e.keyMap.sublime={fallthrough:"default"},u=e.commands,h=e.Pos,d=e.keyMap["default"]==e.keyMap.macDefault,p=d?"Cmd-":"Ctrl-";u[f["Alt-Left"]="goSubwordLeft"]=function(e){n(e,-1)},u[f["Alt-Right"]="goSubwordRight"]=function(e){n(e,1)};var m=d?"Ctrl-Alt-":"Ctrl-";u[f[m+"Up"]="scrollLineUp"]=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top+t.clientHeight,"local");e.getCursor().line>=n&&e.execCommand("goLineUp")}e.scrollTo(null,t.top-e.defaultTextHeight())},u[f[m+"Down"]="scrollLineDown"]=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top,"local")+1;e.getCursor().line<=n&&e.execCommand("goLineDown")}e.scrollTo(null,t.top+e.defaultTextHeight())},u[f["Shift-"+p+"L"]="splitSelectionByLine"]=function(e){for(var t=e.listSelections(),n=[],r=0;r<t.length;r++)for(var o=t[r].from(),i=t[r].to(),a=o.line;a<=i.line;++a)i.line>o.line&&a==i.line&&0==i.ch||n.push({anchor:a==o.line?o:h(a,0),head:a==i.line?i:h(a)});e.setSelections(n,0)},f["Shift-Tab"]="indentLess",u[f.Esc="singleSelectionTop"]=function(e){var t=e.listSelections()[0];e.setSelection(t.anchor,t.head,{scroll:!1})},u[f[p+"L"]="selectLine"]=function(e){for(var t=e.listSelections(),n=[],r=0;r<t.length;r++){var o=t[r];n.push({anchor:h(o.from().line,0),head:h(o.to().line+1,0)})}e.setSelections(n)},f["Shift-Ctrl-K"]="deleteLine",u[f[p+"Enter"]="insertLineAfter"]=function(e){return r(e,!1)},u[f["Shift-"+p+"Enter"]="insertLineBefore"]=function(e){return r(e,!0)},u[f[p+"D"]="selectNextOccurrence"]=function(t){var n=t.getCursor("from"),r=t.getCursor("to"),i=t.state.sublimeFindFullWord==t.doc.sel;if(0==e.cmpPos(n,r)){var a=o(t,n);if(!a.word)return;t.setSelection(a.from,a.to),i=!0}else{var l=t.getRange(n,r),s=i?new RegExp("\\b"+l+"\\b"):l,c=t.getSearchCursor(s,r);c.findNext()?t.addSelection(c.from(),c.to()):(c=t.getSearchCursor(s,h(t.firstLine(),0)),c.findNext()&&t.addSelection(c.from(),c.to()))}i&&(t.state.sublimeFindFullWord=t.doc.sel)};var g="(){}[]";u[f["Shift-"+p+"Space"]="selectScope"]=function(e){i(e)||e.execCommand("selectAll")},u[f["Shift-"+p+"M"]="selectBetweenBrackets"]=function(t){return i(t)?void 0:e.Pass},u[f[p+"M"]="goToBracket"]=function(t){t.extendSelectionsBy(function(n){var r=t.scanForBracket(n.head,1);if(r&&0!=e.cmpPos(r.pos,n.head))return r.pos;var o=t.scanForBracket(n.head,-1);return o&&h(o.pos.line,o.pos.ch+1)||n.head})};var v=d?"Cmd-Ctrl-":"Shift-Ctrl-";u[f[v+"Up"]="swapLineUp"]=function(t){if(t.isReadOnly())return e.Pass;for(var n=t.listSelections(),r=[],o=t.firstLine()-1,i=[],a=0;a<n.length;a++){var l=n[a],s=l.from().line-1,c=l.to().line;i.push({anchor:h(l.anchor.line-1,l.anchor.ch),head:h(l.head.line-1,l.head.ch)}),0!=l.to().ch||l.empty()||--c,s>o?r.push(s,c):r.length&&(r[r.length-1]=c),o=c}t.operation(function(){for(var e=0;e<r.length;e+=2){var n=r[e],o=r[e+1],a=t.getLine(n);t.replaceRange("",h(n,0),h(n+1,0),"+swapLine"),o>t.lastLine()?t.replaceRange("\n"+a,h(t.lastLine()),null,"+swapLine"):t.replaceRange(a+"\n",h(o,0),null,"+swapLine")}t.setSelections(i),t.scrollIntoView()})},u[f[v+"Down"]="swapLineDown"]=function(t){if(t.isReadOnly())return e.Pass;for(var n=t.listSelections(),r=[],o=t.lastLine()+1,i=n.length-1;i>=0;i--){var a=n[i],l=a.to().line+1,s=a.from().line;0!=a.to().ch||a.empty()||l--,o>l?r.push(l,s):r.length&&(r[r.length-1]=s),o=s}t.operation(function(){for(var e=r.length-2;e>=0;e-=2){var n=r[e],o=r[e+1],i=t.getLine(n);n==t.lastLine()?t.replaceRange("",h(n-1),h(n),"+swapLine"):t.replaceRange("",h(n,0),h(n+1,0),"+swapLine"),t.replaceRange(i+"\n",h(o,0),null,"+swapLine")}t.scrollIntoView()})},u[f[p+"/"]="toggleCommentIndented"]=function(e){e.toggleComment({indent:!0})},u[f[p+"J"]="joinLines"]=function(e){for(var t=e.listSelections(),n=[],r=0;r<t.length;r++){for(var o=t[r],i=o.from(),a=i.line,l=o.to().line;r<t.length-1&&t[r+1].from().line==l;)l=t[++r].to().line;n.push({start:a,end:l,anchor:!o.empty()&&i})}e.operation(function(){for(var t=0,r=[],o=0;o<n.length;o++){for(var i,a=n[o],l=a.anchor&&h(a.anchor.line-t,a.anchor.ch),s=a.start;s<=a.end;s++){var c=s-t;s==a.end&&(i=h(c,e.getLine(c).length+1)),c<e.lastLine()&&(e.replaceRange(" ",h(c),h(c+1,/^\s*/.exec(e.getLine(c+1))[0].length)),++t)}r.push({anchor:l||i,head:i})}e.setSelections(r,0)})},u[f["Shift-"+p+"D"]="duplicateLine"]=function(e){e.operation(function(){for(var t=e.listSelections().length,n=0;t>n;n++){var r=e.listSelections()[n];r.empty()?e.replaceRange(e.getLine(r.head.line)+"\n",h(r.head.line,0)):e.replaceRange(e.getRange(r.from(),r.to()),r.from())}e.scrollIntoView()})},f[p+"T"]="transposeChars",u[f.F9="sortLines"]=function(e){a(e,!0)},u[f[p+"F9"]="sortLinesInsensitive"]=function(e){a(e,!1)},u[f.F2="nextBookmark"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){var n=t.shift(),r=n.find();if(r)return t.push(n),e.setSelection(r.from,r.to)}},u[f["Shift-F2"]="prevBookmark"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){t.unshift(t.pop());var n=t[t.length-1].find();if(n)return e.setSelection(n.from,n.to);t.pop()}},u[f[p+"F2"]="toggleBookmark"]=function(e){for(var t=e.listSelections(),n=e.state.sublimeBookmarks||(e.state.sublimeBookmarks=[]),r=0;r<t.length;r++){for(var o=t[r].from(),i=t[r].to(),a=e.findMarks(o,i),l=0;l<a.length;l++)if(a[l].sublimeBookmark){a[l].clear();for(var s=0;s<n.length;s++)n[s]==a[l]&&n.splice(s--,1);break}l==a.length&&n.push(e.markText(o,i,{sublimeBookmark:!0,clearWhenEmpty:!1}))}},u[f["Shift-"+p+"F2"]="clearBookmarks"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(var n=0;n<t.length;n++)t[n].clear();t.length=0},u[f["Alt-F2"]="selectBookmarks"]=function(e){var t=e.state.sublimeBookmarks,n=[];if(t)for(var r=0;r<t.length;r++){var o=t[r].find();o?n.push({anchor:o.from,head:o.to}):t.splice(r--,0)}n.length&&e.setSelections(n,0)},f["Alt-Q"]="wrapLines";var S=p+"K ";f[S+p+"Backspace"]="delLineLeft",u[f.Backspace="smartBackspace"]=function(t){if(t.somethingSelected())return e.Pass;var n=t.getCursor(),r=t.getRange({line:n.line,ch:0},n),o=e.countColumn(r,null,t.getOption("tabSize")),i=t.getOption("indentUnit");if(r&&!/\S/.test(r)&&o%i==0){var a=new h(n.line,e.findColumn(r,o-i,i));return a.ch==n.ch?e.Pass:t.replaceRange("",a,n,"+delete")}return e.Pass},u[f[S+p+"K"]="delLineRight"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=t.length-1;n>=0;n--)e.replaceRange("",t[n].anchor,h(t[n].to().line),"+delete");e.scrollIntoView()})},u[f[S+p+"U"]="upcaseAtCursor"]=function(e){l(e,function(e){return e.toUpperCase()})},u[f[S+p+"L"]="downcaseAtCursor"]=function(e){l(e,function(e){return e.toLowerCase()})},u[f[S+p+"Space"]="setSublimeMark"]=function(e){e.state.sublimeMark&&e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor())},u[f[S+p+"A"]="selectToSublimeMark"]=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&e.setSelection(e.getCursor(),t)},u[f[S+p+"W"]="deleteToSublimeMark"]=function(t){var n=t.state.sublimeMark&&t.state.sublimeMark.find();if(n){var r=t.getCursor(),o=n;if(e.cmpPos(r,o)>0){var i=o;o=r,r=i}t.state.sublimeKilled=t.getRange(r,o),t.replaceRange("",r,o)}},u[f[S+p+"X"]="swapWithSublimeMark"]=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&(e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor()),e.setCursor(t))},u[f[S+p+"Y"]="sublimeYank"]=function(e){null!=e.state.sublimeKilled&&e.replaceSelection(e.state.sublimeKilled,null,"paste")},f[S+p+"G"]="clearBookmarks",u[f[S+p+"C"]="showInCenter"]=function(e){var t=e.cursorCoords(null,"local");e.scrollTo(null,(t.top+t.bottom)/2-e.getScrollInfo().clientHeight/2)},u[f["Shift-Alt-Up"]="selectLinesUpward"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=0;n<t.length;n++){var r=t[n];r.head.line>e.firstLine()&&e.addSelection(h(r.head.line-1,r.head.ch))}})},u[f["Shift-Alt-Down"]="selectLinesDownward"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=0;n<t.length;n++){var r=t[n];r.head.line<e.lastLine()&&e.addSelection(h(r.head.line+1,r.head.ch))}})},u[f[p+"F3"]="findUnder"]=function(e){c(e,!0)},u[f["Shift-"+p+"F3"]="findUnderPrevious"]=function(e){c(e,!1)},u[f["Alt-F3"]="findAllUnder"]=function(e){var t=s(e);if(t){for(var n=e.getSearchCursor(t.query),r=[],o=-1;n.findNext();)r.push({anchor:n.from(),head:n.to()}),n.from().line<=t.from.line&&n.from().ch<=t.from.ch&&o++;e.setSelections(r,o)}},f["Shift-"+p+"["]="fold",f["Shift-"+p+"]"]="unfold",f[S+p+"0"]=f[S+p+"j"]="unfoldAll",f[p+"I"]="findIncremental",f["Shift-"+p+"I"]="findIncrementalReverse",f[p+"H"]="replace",f.F3="findNext",f["Shift-F3"]="findPrev",e.normalizeKeyMap(f)});
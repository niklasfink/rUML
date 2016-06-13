!function(){"use strict";function t(t){var r=a[o];if(r)return r;var l,e,n,C,o=t.replace(/\w+-/g,function(t){return"Ctrl-"==t?l=!0:"Alt-"==t?n=!0:"Shift-"==t&&(e=!0),""});for(var i in CodeMirror.keyNames)if(CodeMirror.keyNames[i]==o){C=i;break}if(null==C)throw new Error("Unknown key: "+o);return a[t]={type:"keydown",keyCode:C,ctrlKey:l,shiftKey:e,altKey:n,preventDefault:function(){},stopPropagation:function(){}}}function r(r,l){var e=Array.prototype.slice.call(arguments,2);testCM(r,function(r){for(var l=0;l<e.length;++l){var a=e[l];a instanceof n?r.setCursor(a):a.call?a(r):r.triggerOnKeyDown(t(a))}},{keyMap:"emacs",value:l,mode:"javascript"})}function l(t,r){return function(l){eqPos(l.getCursor(),n(t,r))}}function e(t){return function(r){eq(r.getValue(),t)}}var n=CodeMirror.Pos;namespace="emacs_";var a={};r("motionHSimple","abc","Ctrl-F","Ctrl-F","Ctrl-B",l(0,1)),r("motionHMulti","abcde","Ctrl-4","Ctrl-F",l(0,4),"Ctrl--","Ctrl-2","Ctrl-F",l(0,2),"Ctrl-5","Ctrl-B",l(0,0)),r("motionHWord","abc. def ghi","Alt-F",l(0,3),"Alt-F",l(0,8),"Ctrl-B","Alt-B",l(0,5),"Alt-B",l(0,0)),r("motionHWordMulti","abc. def ghi ","Ctrl-3","Alt-F",l(0,12),"Ctrl-2","Alt-B",l(0,5),"Ctrl--","Alt-B",l(0,8)),r("motionVSimple","a\nb\nc\n","Ctrl-N","Ctrl-N","Ctrl-P",l(1,0)),r("motionVMulti","a\nb\nc\nd\ne\n","Ctrl-2","Ctrl-N",l(2,0),"Ctrl-F","Ctrl--","Ctrl-N",l(1,1),"Ctrl--","Ctrl-3","Ctrl-P",l(4,1)),r("killYank","abc\ndef\nghi","Ctrl-F","Ctrl-Space","Ctrl-N","Ctrl-N","Ctrl-W","Ctrl-E","Ctrl-Y",e("ahibc\ndef\ng")),r("killRing","abcdef","Ctrl-Space","Ctrl-F","Ctrl-W","Ctrl-Space","Ctrl-F","Ctrl-W","Ctrl-Y","Alt-Y",e("acdef")),r("copyYank","abcd","Ctrl-Space","Ctrl-E","Alt-W","Ctrl-Y",e("abcdabcd")),r("killLineSimple","foo\nbar","Ctrl-F","Ctrl-K",e("f\nbar")),r("killLineEmptyLine","foo\n  \nbar","Ctrl-N","Ctrl-K",e("foo\nbar")),r("killLineMulti","foo\nbar\nbaz","Ctrl-F","Ctrl-F","Ctrl-K","Ctrl-K","Ctrl-K","Ctrl-A","Ctrl-Y",e("o\nbarfo\nbaz")),r("moveByParagraph","abc\ndef\n\n\nhij\nklm\n\n","Ctrl-F","Ctrl-Down",l(2,0),"Ctrl-Down",l(6,0),"Ctrl-N","Ctrl-Up",l(3,0),"Ctrl-Up",l(0,0),n(1,2),"Ctrl-Down",l(2,0),n(4,2),"Ctrl-Up",l(3,0)),r("moveByParagraphMulti","abc\n\ndef\n\nhij\n\nklm","Ctrl-U","2","Ctrl-Down",l(3,0),"Shift-Alt-.","Ctrl-3","Ctrl-Up",l(1,0)),r("moveBySentence","sentence one! sentence\ntwo\n\nparagraph two","Alt-E",l(0,13),"Alt-E",l(1,3),"Ctrl-F","Alt-A",l(0,13)),r("moveByExpr","function foo(a, b) {}","Ctrl-Alt-F",l(0,8),"Ctrl-Alt-F",l(0,12),"Ctrl-Alt-F",l(0,18),"Ctrl-Alt-B",l(0,12),"Ctrl-Alt-B",l(0,9)),r("moveByExprMulti","foo bar baz bug","Ctrl-2","Ctrl-Alt-F",l(0,7),"Ctrl--","Ctrl-Alt-F",l(0,4),"Ctrl--","Ctrl-2","Ctrl-Alt-B",l(0,11)),r("delExpr","var x = [\n  a,\n  b\n  c\n];",n(0,8),"Ctrl-Alt-K",e("var x = ;"),"Ctrl-/",n(4,1),"Ctrl-Alt-Backspace",e("var x = ;")),r("delExprMulti","foo bar baz","Ctrl-2","Ctrl-Alt-K",e(" baz"),"Ctrl-/","Ctrl-E","Ctrl-2","Ctrl-Alt-Backspace",e("foo ")),r("justOneSpace","hi      bye  ",n(0,4),"Alt-Space",e("hi bye  "),n(0,4),"Alt-Space",e("hi b ye  "),"Ctrl-A","Alt-Space","Ctrl-E","Alt-Space",e(" hi b ye ")),r("openLine","foo bar","Alt-F","Ctrl-O",e("foo\n bar")),r("transposeChar","abcd\ne","Ctrl-F","Ctrl-T","Ctrl-T",e("bcad\ne"),l(0,3),"Ctrl-F","Ctrl-T","Ctrl-T","Ctrl-T",e("bcda\ne"),l(0,4),"Ctrl-F","Ctrl-T",e("bcde\na"),l(1,0)),r("manipWordCase","foo BAR bAZ","Alt-C","Alt-L","Alt-U",e("Foo bar BAZ"),"Ctrl-A","Alt-U","Alt-L","Alt-C",e("FOO bar Baz")),r("manipWordCaseMulti","foo Bar bAz","Ctrl-2","Alt-U",e("FOO BAR bAz"),"Ctrl-A","Ctrl-3","Alt-C",e("Foo Bar Baz")),r("upExpr","foo {\n  bar[];\n  baz(blah);\n}",n(2,7),"Ctrl-Alt-U",l(2,5),"Ctrl-Alt-U",l(0,4)),r("transposeExpr","do foo[bar] dah",n(0,6),"Ctrl-Alt-T",e("do [bar]foo dah")),r("clearMark","abcde",n(0,2),"Ctrl-Space","Ctrl-F","Ctrl-F","Ctrl-G","Ctrl-W",e("abcde")),r("delRegion","abcde","Ctrl-Space","Ctrl-F","Ctrl-F","Delete",e("cde")),r("backspaceRegion","abcde","Ctrl-Space","Ctrl-F","Ctrl-F","Backspace",e("cde")),testCM("save",function(r){var l=!1;CodeMirror.commands.save=function(t){l=t.getValue()},r.triggerOnKeyDown(t("Ctrl-X")),r.triggerOnKeyDown(t("Ctrl-S")),is(l,"hi")},{value:"hi",keyMap:"emacs"}),testCM("gotoInvalidLineFloat",function(r){r.openDialog=function(t,r){r("2.2")},r.triggerOnKeyDown(t("Alt-G")),r.triggerOnKeyDown(t("G"))},{value:"1\n2\n3\n4",keyMap:"emacs"})}();
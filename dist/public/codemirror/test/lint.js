var blint=require("blint");["mode","lib","addon","keymap"].forEach(function(e){blint.checkDir(e,{browser:!0,allowedGlobals:["CodeMirror","define","test","requirejs"],blob:"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n\n"})}),module.exports={ok:blint.success()};
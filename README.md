![rUML Logo](https://github.com/niklasfink/rUML/blob/master/gitimg/rUML.png)

[![Code Climate][cc-img-link]][cc-link]
[![Dependency Status][dependencies-img-link]][dependencies-link] [![Gitter](https://badges.gitter.im/niklasfink/rUML.svg)](https://gitter.im/niklasfink/rUML?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# rUML
A ruby to UML generator: Insert ruby object definitions on the one side, get a automatical aligned UML diagram on the other side.

## Example
![Example Conversion](https://github.com/niklasfink/rUML/blob/master/gitimg/example%20conversion.png)

## Motivation
This is a tool built out of a project work at the University of Applied Science Esslingen in cooperation with professor Hans-Gerhard Groß

## Installation
1. Install ruby on your machine (pasting `ruby -e "puts 'Hello'"` in your console needs to output "Hello")
2. Install nodejs
3. Run `npm install` to load dependencies
4. Run `gulp` to build project
5. Run `gulp serve` to start up dev-system or `node ./dist/server.js` to start rUML


A guide to GIT in German: https://rogerdudler.github.io/git-guide/index.de.html  
Clientside DOT conversion: https://github.com/mdaines/viz.js/  
Gulp introduction: https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js  

"[design](https://github.com/niklasfink/rUML/tree/design)" branch for design changes, main contributor @rasidmusic  
"[improvements](https://github.com/niklasfink/rUML/tree/improvements)" branch for small improvements which dont fit in other branches  
`git config --global core.longpaths true` long paths issue fix



[dependencies-img-link]: https://david-dm.org/niklasfink/ruml.svg
[dependencies-link]: https://david-dm.org/niklasfink/ruml
[cc-img-link]: https://codeclimate.com/github/niklasfink/rUML/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/niklasfink/rUML

Please use master branch to read the README: https://github.com/niklasfink/rUML/tree/master

"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].on('--help', function () {
  console.log('                  json-key-discriminator CLI');
  console.log('                  Usage: jkd [Option]');
  console.log('                  Option: ');
  console.log('                      -h:  Display this help message');
  console.log('                      -f:  first name of json file');
  console.log('                      -s:  second name of json file');
});

_commander["default"].version('1.0.0').description('this is a simple JSON key value discriminator.').option('-d , --dir [type]', 'directory name').option('-f ,--first [type]', 'first json name - main file').option('-s ,--second [type]', 'second json name - compare file').action(function (options) {
  (0, _index.start)(options.dir, options.first, options.second);
}); // 해당되는 command가 없을 경우 실행되는 command


_commander["default"].command('*', {
  noHelp: true
}).action(function () {
  console.log('cannot find commander.');

  _commander["default"].help();
});

_commander["default"].parse(process.argv);
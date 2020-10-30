"use strict";

var _commander = require("commander");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var program = new _commander.Command();
program.version('0.0.1').description('this is a simple JSON key value discriminator.').option('-h, --help', 'help guide');
program.parse(process.argv);
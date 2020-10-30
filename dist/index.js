"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// extract key values
var bothContainArray = []; // apple , banana, grape , melon , number

var onlyInMain = []; // main

var onlyInCompare = [];

function extractKeyValues(jsonfile) {
  var keyArray = [];

  for (var key in jsonfile) {
    keyArray.push(key);
  }

  return keyArray;
} //  로컬에서 파일 패스까지를 리턴함.


function getDirPath(folder) {
  var root = process.cwd();
  return _path["default"].join(root, folder);
} // 사용자들의 json파일들 array return


function getJsonFiles(dirPath) {
  // json이 있는 dirPath 가져오기. 현재  project는 exam에 json파일들 있음
  var files = _fs["default"].readdirSync(dirPath);

  console.log('dir path', dirPath);
  return files;
}

function readFile(jsonFiles, dirPath, readFile) {
  var readFilePath = dirPath.concat('\\' + readFile + '.json');
  return JSON.parse(_fs["default"].readFileSync(readFilePath).toString('utf-8'));
}

function compareKeyValuesArray(mainArray, compareArray) {
  mainArray.forEach(function (el) {
    compareArray.includes(el) ? bothContainArray.push(el) : onlyInMain.push(el);
  });
  compareArray.forEach(function (el) {
    if (!bothContainArray.includes(el)) {
      onlyInCompare.push(el);
    }

    ;
  });
} // chalk로 highlight


function printDifference(mainFileName, compareFileName, mainArray, compareArray) {
  console.log('--- compare two json key ---');
  mainArray.forEach(function (el) {
    console.log("it's a key value only in", _chalk["default"].blue("".concat(mainFileName, ".json")), _chalk["default"].red(el));
  });
  compareArray.forEach(function (el) {
    console.log("it's a key value only in", _chalk["default"].green("".concat(compareFileName, ".json")), _chalk["default"].red(el));
  });
}

function start() {
  var dirPath = getDirPath('exam');
  var dirJsonFiles = getJsonFiles(dirPath);
  var mainFileName = 'test';
  var compareFileName = 'lang-en'; // 하나만 읽을 수 있는 함수로 변경.

  var mainArray = extractKeyValues(readFile(dirJsonFiles, dirPath, mainFileName));
  var compareArray = extractKeyValues(readFile(dirJsonFiles, dirPath, compareFileName));
  compareKeyValuesArray(mainArray, compareArray);
  printDifference(mainFileName, compareFileName, onlyInMain, onlyInCompare);
}

start();
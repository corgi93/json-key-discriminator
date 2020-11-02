"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var bothContainArray = []; // apple , banana, grape , melon , number

var onlyInMain = []; // main

var onlyInCompare = [];

function extractKeyValues(jsonFile) {
  var keyArray = [];

  for (var key in jsonFile) {
    keyArray.push(key);
  }

  return keyArray;
}

function checkHasFileInFolder(dirJsonFiles, fileName) {
  var addFormatFileName = fileName.concat('.json');
  var check = false;

  var _iterator = _createForOfIteratorHelper(dirJsonFiles),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;

      if (addFormatFileName === el) {
        check = true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return check;
} //  로컬에서 파일 패스까지를 리턴함.


function getDirPath(folder) {
  var root = process.cwd();
  return _path["default"].join(root, folder);
} // 사용자들의 json파일들 array return


function getJsonFiles(dirPath) {
  // json이 있는 dirPath 가져오기. 현재  project는 exam에 json파일들 있음
  var files = _fs["default"].readdirSync(dirPath); // console.log('dir path' ,dirPath);


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


function printDifference(dirName, mainFileName, compareFileName, mainArray, compareArray) {
  console.log('--- compare two json key ---');
  mainArray.forEach(function (el) {
    console.log("it's a key value only in ".concat(dirName, "/").concat(_chalk["default"].blue("".concat(mainFileName, ".json"))), _chalk["default"].red(el));
  });
  compareArray.forEach(function (el) {
    console.log("it's a key value only in ".concat(dirName, "/").concat(_chalk["default"].green("".concat(compareFileName, ".json"))), _chalk["default"].red(el));
  });
}

function start(dirName, mainFileName, compareFileName) {
  var dirPath = getDirPath(dirName);
  var dirJsonFiles = getJsonFiles(dirPath);
  var hasMainFileInFolder = checkHasFileInFolder(dirJsonFiles, mainFileName);
  var hasCompareFileInFolder = checkHasFileInFolder(dirJsonFiles, compareFileName);
  var mainArray;
  var compareArray;

  if (!hasMainFileInFolder) {
    console.error(_chalk["default"].red("".concat(dirName, "/").concat(mainFileName, ".json\uC774 \uD3F4\uB354\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4. json\uD30C\uC77C \uC774\uB984\uC744 \uC815\uD655\uD788 \uC785\uB825\uD574\uC8FC\uC138\uC694")));
  } else {
    mainArray = extractKeyValues(readFile(dirJsonFiles, dirPath, mainFileName));
  }

  if (!hasCompareFileInFolder) {
    console.error(_chalk["default"].red("".concat(dirName, "/").concat(compareFileName, ".json\uC774 \uD3F4\uB354\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4. json\uD30C\uC77C \uC774\uB984\uC744 \uC815\uD655\uD788 \uC785\uB825\uD574\uC8FC\uC138\uC694")));
  } else {
    compareArray = extractKeyValues(readFile(dirJsonFiles, dirPath, compareFileName));
  }

  if (hasMainFileInFolder && hasCompareFileInFolder) {
    compareKeyValuesArray(mainArray, compareArray);
    printDifference(dirName, mainFileName, compareFileName, onlyInMain, onlyInCompare);
  }
}
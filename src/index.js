// extract key values
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';

let bothContainArray = []; // apple , banana, grape , melon , number
let onlyInMain = []; // main
let onlyInCompare = [];

function extractKeyValues (jsonfile) {
	let keyArray = [];
	for (let key in jsonfile) {
		keyArray.push(key);
	}
	return keyArray;
}
//  로컬에서 파일 패스까지를 리턴함.
function getDirPath(folder) {
	const root = process.cwd();
	return path.join(root , folder);
}

// 사용자들의 json파일들 array return
function getJsonFiles(dirPath) {
	// json이 있는 dirPath 가져오기. 현재  project는 exam에 json파일들 있음
	const files = fs.readdirSync(dirPath);
	console.log('dir path' ,dirPath);
	return files;
}

function readFile(jsonFiles , dirPath, readFile){
	const readFilePath = dirPath.concat('\\' + readFile + '.json');
	return JSON.parse(fs.readFileSync(readFilePath).toString('utf-8'));
}

function compareKeyValuesArray(mainArray , compareArray) {
	mainArray.forEach( el => {
		compareArray.includes(el) ? bothContainArray.push(el) : onlyInMain.push(el);
	})
	compareArray.forEach(el => {
		if(!bothContainArray.includes(el)){onlyInCompare.push(el)};
	})
}

// chalk로 highlight
function printDifference(  mainFileName, compareFileName ,mainArray, compareArray){
	console.log('--- compare two json key ---');
	mainArray.forEach(el => {
		console.log( `it's a key value only in` ,chalk.blue(`${mainFileName}.json`), chalk.red(el));
	});

	compareArray.forEach(el => {
		console.log( `it's a key value only in` ,chalk.green(`${compareFileName}.json`), chalk.red(el));
	})
}

function start(){
	let dirPath = getDirPath('exam');
	let dirJsonFiles = getJsonFiles(dirPath);
	let mainFileName = 'test';
	let compareFileName = 'lang-en';

	// 하나만 읽을 수 있는 함수로 변경.
	let mainArray = extractKeyValues(readFile(dirJsonFiles , dirPath, mainFileName));
	let compareArray = extractKeyValues(readFile(dirJsonFiles , dirPath, compareFileName));

	compareKeyValuesArray( mainArray , compareArray );
	printDifference( mainFileName , compareFileName ,onlyInMain , onlyInCompare );
}

start();
// extract key values
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';

let bothContainArray = []; // apple , banana, grape , melon , number
let onlyInMain = []; // main
let onlyInCompare = [];

function extractKeyValues (jsonFile) {
	let keyArray = [];
	for (let key in jsonFile) {
		keyArray.push(key);
	}
	return keyArray;
}

function checkHasFileInFolder (dirJsonFiles , fileName){
	let addFormatFileName = fileName.concat('.json');
	let check = false;
	for (const el of dirJsonFiles) {
		if(addFormatFileName === el){
			check = true;
		}
	}
	return check;
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
	// console.log('dir path' ,dirPath);
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
function printDifference( dirName, mainFileName, compareFileName ,mainArray, compareArray){
	console.log('--- compare two json key ---');
	mainArray.forEach(el => {
		console.log( `it's a key value only in ${dirName}/`.concat(chalk.blue(`${mainFileName}.json`)), chalk.red(el));
	});

	compareArray.forEach(el => {
		console.log( `it's a key value only in ${dirName}/`.concat(chalk.green(`${compareFileName}.json`)) , chalk.red(el));
	})
}

export function start(  dirName, mainFileName, compareFileName ){
	let dirPath = getDirPath(dirName);
	let dirJsonFiles = getJsonFiles(dirPath);
	let hasMainFileInFolder = checkHasFileInFolder(dirJsonFiles , mainFileName);
	let hasCompareFileInFolder = checkHasFileInFolder(dirJsonFiles , compareFileName);
	let mainArray;
	let compareArray;

	if(!hasMainFileInFolder){
		console.error(chalk.red(`${dirName}/${mainFileName}.json이 폴더에 없습니다. json파일 이름을 정확히 입력해주세요`))
	}else{
		mainArray = extractKeyValues(readFile(dirJsonFiles , dirPath, mainFileName));
	}
	if(!hasCompareFileInFolder){
		console.error(chalk.red(`${dirName}/${compareFileName}.json이 폴더에 없습니다. json파일 이름을 정확히 입력해주세요`))
	}else{
		compareArray = extractKeyValues(readFile(dirJsonFiles , dirPath, compareFileName));
	}

	if(hasMainFileInFolder && hasCompareFileInFolder){
		compareKeyValuesArray( mainArray , compareArray );
		printDifference(dirName ,mainFileName , compareFileName , onlyInMain , onlyInCompare );
	}
}
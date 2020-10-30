const path = require('path');
const fs = require('fs');
var LANG_EN = require('../../exam/lang-en.json');
var LANG_KR = require('../../exam/lang-kr.json');

describe('read JSON file & extra key values and push array', () => {
	it('read lang json file' , () => {
		function readLangEN(){
			console.log(LANG_EN);
		}
		expect(readLangEN()).toBe(console.log({
				apple: 'apple',
				banana: 'banana',
				grape: 'grape',
				melon: 'melon',
				number: 12
			}
		))
	})

	it('extract key value in comparing arrays' , () => {
		// 비교할 두 json파일에서 key 값 추출
		let keyArray = [];

		for (let langkrKey in LANG_KR) {
			keyArray.push(langkrKey);
		}

		expect(keyArray).toEqual(
			['apple', 'banana' , 'grape', 'melon' , 'number', "onlyB"]
		)
	})
})

describe('compare key value in extracted two arrays', () => {
	const mainArray = ['apple', 'banana' , 'grape', 'melon' , 'number', 'main'];
	const compareArray = ['apple', 'banana' , 'grape', 'melon' , 'number', 'compare'];

	const bothContainArray = []; // apple , banana, grape , melon , number
	const onlyInMain = []; // main
	const onlyInCompare = [];

	mainArray.forEach( el => {
		compareArray.includes(el) ? bothContainArray.push(el) : onlyInMain.push(el);
	})
	compareArray.forEach(el => {
		if(!bothContainArray.includes(el)){onlyInCompare.push(el)};
	})

	it('should return bothContainArray ',() =>{
		expect(bothContainArray).toEqual(
			['apple', 'banana' , 'grape', 'melon' , 'number']
		)
	})

	it('should return only in main array' , () => {
		expect(onlyInMain).toEqual(
			['main']
		)
	})

	it('should return only in compare array' , () => {
		expect(onlyInCompare).toEqual(
			['compare']
		)
	})
})

describe('read file name' , () => {
	it('should return JSON file name', () => {
		const dirPath = path.join(__dirname , "exam");
		expect(dirPath).toEqual('C:\\Users\\gurwl\\workspace\\json-key-discriminator\\test\\unit\\exam');
	})

	it('should return root path', () => {
		const root = process.cwd();
		expect(root).toBe('C:\\Users\\gurwl\\workspace\\json-key-discriminator')
	})

	it('should read JSON file by String and parsing to JSON', () => {
		const filePath = "C:\\Users\\gurwl\\workspace\\json-key-discriminator\\exam\\test.json";
		var readData;
		readData = JSON.parse(fs.readFileSync(filePath).toString('utf-8'));
		expect(readData).toEqual({"t1": "test1", "t2": "test2", "t3": "test3"})
	});
})

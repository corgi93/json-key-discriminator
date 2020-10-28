// extract key values

let bothContainArray = []; // apple , banana, grape , melon , number
let onlyInMain = []; // main
let onlyInCompare = [];

function extractKeyValues (jsonfile) {
	let keyArray = [];
	for (let key in jsonfile) {
		keyArray.push(key);
	}
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
function printDifference(){

}

// onlyInMain & onlyInCompare 의 line 수를 잡아내도록.
function trace(){

}

function start(){
	extractKeyValues();
}

start();
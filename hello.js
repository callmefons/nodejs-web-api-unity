console.log("Hello World");

//Test
var a = 1000;
function sum(param){
	a+=param; 
	return a;
}

var add = function(a,b){
	return a + b;	
}

console.log(sum(add(100,100)));
class Cal {
	constructor (){

	}
	ascending (num){
		let max = 0;
		for(let [index,value] of num.entries()){
			let length = (value+'').split('.')[1] ? (value+'').split('.')[1].length : 0;;
			max = max <= length ? length : max;
		}
		return Math.pow(10,max);
	}
	start (method,num){
		if(num.length === 1){
			return num[0];
		}
		let m = this.ascending(num);
		let totle = 0;
		let cf = null;
		switch(method){
			case "+" : 
				cf = function(num1,num2){
					return num1+num2;
				}
		}
		for(let [index,value] of num.entries()){
			if(isNaN(value) || Array.isArray(value)){
				return new Error(`第${index}项:${value} 不是数字`);
			}
			totle = cf(totle,value*m);
		}
		return totle/m;
	}
	add (...num){
		return this.start("+",num);
	}
}
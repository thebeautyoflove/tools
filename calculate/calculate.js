//待测试用例，代码待优化
class Cal {
	constructor (){

	}
	ascending (num){
		let max = 0;
		for(let [index,value] of num.entries()){
			let length = (value+'').split('.')[1] ? (value+'').split('.')[1].length : 0;
			max = max <= length ? length : max;
		}
		return Math.pow(10,max);
	}
	beInt(num,m){
		let totle = 0;
		(num+'').split(".").map((v,index)=>{
			if(index === 0){
				totle += v*m;
			}else{
				if(v.length < m.toString().length-1){
					totle += v*m/10
				}else{
					totle += v*1
				}
			}
		})
		return totle;
	}
	start (method,num){
		if(num.length === 1){
			return num[0];
		}
		let m = this.ascending(num);
		let totle = this.beInt(num[0],m);
		let cf = null;
		switch(method){
			case "+" : 
				cf = function(totle,num2){
					return totle+num2;
				}
				break;
			case "-" : 
				cf = function(totle,num2){
					return totle-num2;
				}
				break;
			case "*" : 
				cf = function(totle,num2){
					return totle*num2;
				}
				break;
			case "/" : 
				cf = (totle,num2)=>{
					if(/^\d*\.\d*$/.test(totle)){
						return this.mul(this.div(totle,num2),m);
					}
					return totle/num2;
				}
				break;
			default : throw new Error('暂未支持')
		}
		for(let [index,value] of num.entries()){
			if(index === 0){continue}
			if(isNaN(value) || Array.isArray(value)){
				return new Error(`第${index}项:${value} 不是数字`);
			}
			totle = cf(totle,this.beInt(value,m));
		}
		return {
			totle,m
		};
	}
	add (...num){
		let {totle,m} = this.start("+",num);
		return totle/m;
	}
	sub (...num){
		let {totle,m} = this.start("-",num);
		return totle/m;
	}
	mul (...num){
		let {totle,m} = this.start("*",num);
		return totle/(Math.pow(m,num.length))
	}
	div (...num){
		let {totle,m} = this.start("/",num);
		return totle;
	}
}
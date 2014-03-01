var abort = function(){

}

var startLadder = function(){
	
}

var MyQueue = function(){
	var arr = new Array()
	var length = 0	

	this.pop = function(){
		length -= 1
		return arr.shift()
	}

	this.push = function(next){
		length += 1
		arr.push(next)
	}

	this.length = function(){
		return length
	}

	this.clone = function(){
		aQueue = new MyQueue
		for(var i=0; i<this.length(); i++){
			var word = this.pop()
			aQueue.push(word)
			this.push(word)
		}
		return aQueue
	}
}

var MyStack = function(){
	var arr = new Array()
	var length = 0

	this.pop = function(){
		length -= 1
		return arr.pop()
	}
	
	this.push = function(word){
		length += 1
		arr.push(word)
	}

	this.length = function(){
		return length
	}

	this.clone = function(){
		aStack = new MyStack()
		var tempArr = new Array()
		for(var i=0; i<=this.length()+1; i++){
			var word = this.pop()
			tempArr.push(word)
		}
		for(var i=tempArr.length-1; i>=0; i--){
			this.push(tempArr[i])
			aStack.push(tempArr[i])
		}
		return aStack	
	}

}









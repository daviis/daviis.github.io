var abort = function(){
	location.reload()
}

var startLadder = function(){
	var startWord = document.getElementById("startWord").value
	var endWord = document.getElementById("endWord").value
	var wordLength = document.getElementById("length").value
	var errorState = false
	var out = document.createElement("p")
	if(startWord.length != wordLength || endWord.length != wordLength){
		console.log("its the wrong length")
		errorState = true
		out.innerHTML = "At least one of the words is of the wrong length"
	}
	else{
		console.log("ok length")
	}
	var wordSet
	if(wordLength == 3){
		wordSet = new MySet(threeLetterWords)
	}
	else if(wordLength ==4){
		wordSet = new MySet(fourLetterWords)
	}
	else{
		wordSet = new MySet(fiveLetterWords)	
	}
	if(wordSet.contains(startWord) < 0 || wordSet.contains(endWord) < 0){
		console.log("out of set")
		errorState = true
		out.innerHTML = "At least one of the words is not in the set of ladder words"
	}
	else{
		console.log("in set") 
	}
	if(!errorState){
		var finalList = findWordLadder(startWord, endWord, wordSet)
		out = document.createElement("ul")
		var finalLen = finalList.length()
		for(var i = 0; i < finalLen; i++){
			out.innerHTML = out.innerHTML + "<li>" + finalList.pop() + "</li>"
		}
	}
	outField = document.getElementById("output")
	if(outField.hasChildNodes()){
		outField.removeChild(outField.firstChild)
	}
	outField.appendChild(out)
	
}

var findWordLadder = function(first, last, set){
	var runQueue = new MyQueue()
	var aStack = new MyStack()
	aStack.push(first)
	runQueue.enqueue(aStack)
	var topWord = aStack.peek()
	while(topWord != last){
		while(set.next()){
			if(aStack.contains(set.place()) < 0 && offByOne(topWord, set.place())){
				var newStack = aStack.clone()
				newStack.push(set.place())
				runQueue.enqueue(newStack)
			}
		}
		set.resetPointer()
		aStack = runQueue.dequeue()
		if(typeof aStack == 'undefined'){
			var emptyStack = new MyStack()
			emptyStack.push("A ladder was not possible with the words given")
			return emptyStack
		}
		topWord = aStack.peek()
	}
	return aStack

}


var offByOne = function(wOne, wTwo){
	var place = 0
	var same = true
	while(place < wOne.length){
		if(wOne[place] != wTwo[place]){
			if(same){
				same = false
			}
			else{
				return false
			}
		}
		place += 1
	}
	if(same){
		return false
	}
	return true
}



//classes for doing data management
var MySet = function(words){
	this.arr = words
	var len = words.length
	var pointer = 0

	this.onNext = this.arr[0]
	
	this.next = function(){
		if(pointer + 2 > len){
			return false
		}
		pointer += 1
		this.onNext = this.arr[pointer]
		return true
	}
	
	this.place = function(){
		return this.arr[pointer]
	}

	this.add = function(aWord){
		if(this.contains(aWord) < 0){
			this.arr.push(aWord)
			len += 1
			return true
		}
		else {
			return false
		}
		
	}
	
	this.deleteWord = function(aWord){
		var position = this.contains(aWord)
		if(position > 0){
			len -=1
			this.arr.splice(position, 1)
			return true
		}
		else{
			return false
		}
	}
	
	this.resetPointer = function(){
		pointer = 0
		this.onNext = this.arr[pointer]
	}
	
	this.contains = function(aWord){
		return this.arr.indexOf(aWord)
	}

	this.length = function(){
		return len
	}

	this.pointer = function(){
		return pointer
	}
}


var MyQueue = function(){
	var arr = new Array()
	var length = 0	

	this.dequeue = function(){
		length -= 1
		return arr.shift()
	}

	this.enqueue = function(next){
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
		var totalSize = length
		for(var i=0; i < totalSize; i++){
			var word = this.pop()
			tempArr.push(word)
		}
		for(var i=tempArr.length-1; i>=0; i--){
			this.push(tempArr[i])
			aStack.push(tempArr[i])
		}
		return aStack	
	}

	this.peek = function(){
		var highest = arr.pop()
		arr.push(highest)
		return highest
	}

	this.contains = function(aWord){
		return arr.indexOf(aWord)
	}
	
	this.arr = function(){
		return arr
	}

}

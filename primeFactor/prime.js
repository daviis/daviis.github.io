var outputTable = document.createElement("table")
var outputTree = document.createElement("table")

var mainControll = function(){
 var userNumber = document.getElementById("inputNumber").value
 var resultArray = new Array()
 findPrime(userNumber, resultArray) 
 var outputSpace = document.getElementById("outTable")
 var rowOne = document.createElement("tr")
 rowOne.innerHTML = "<th>YourNumber: </th><th>" + userNumber +"</th>"
 outputTable.appendChild(rowOne)
 for (var arrLen = 0; arrLen < resultArray.length; arrLen++){
  var resultRow = document.createElement("tr")
  resultRow.innerHTML = resultArray[arrLen]
  outputTable.appendChild(resultRow)
 }
 var gap = document.createElement("tr")
 gap.innerHTML = "<th>----</th>"
 outputTable.appendChild(gap)
 outputSpace.appendChild(outputTable)
 var resTablePlace = document.getElementById("outTree")
 makeFactorTreeTwo(resultArray)
}

 
var findPrime = function(largeNumber, primeArray){
 var checkNumber = 2
 while (largeNumber > 1){
  while (largeNumber % checkNumber == 0){
   primeArray.push(checkNumber)
   largeNumber = Math.floor(largeNumber / checkNumber)
  }
  checkNumber = checkNumber + 1
  if (checkNumber * checkNumber > largeNumber){
   if (largeNumber > 1){
    primeArray.push(largeNumber)
    break
   }
  }
 }
}

var makeFactorTreeTwo = function(arr){
  var outField = document.getElementById("outTree")
  var row = document.createElement("tr")
  var index = 0
  while(index < arr.length){
    row.innerHTML = row.innerHTML +  "<td>" + arr[index] +"</td>" 
    index++  
  }
  outField.appendChild(row)
  if(arr.length <= 1){
    row = document.createElement("tr")
    row.innerHTML = "<td>---</td>"
    outField.appendChild(row)
    return
  }
  var nextArr = new Array()
  index = 0
  while(index <= Math.ceil(arr.length/2)){
    if(index >= arr.length-1){
      nextArr.push(arr[index])
    }
    else{
      nextArr.push(arr[index] * arr[index+1])
    }
    index = index + 2
  }
  makeFactorTreeTwo(nextArr)
}








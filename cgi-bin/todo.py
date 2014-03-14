#!/home/students/daviis01/cs365/todoenv/bin/python3

import yaml

print ("Content-type: text/html")
print ("")
print ('''<head>
	<link rel="stylesheet" type="text/css" href="../theme.css">
	</head>
	<body>''')
try:
	aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/todo.dat")
	aDict = yaml.load(aFile)	
	print("<h1>ToDo!</h1>")
	for key in aDict:
		print("<h3>"+key+"</h3>")
		if(aDict[key] != None):
			for todoItem in aDict[key]:
				try:
					itemDict = aDict[key][todoItem]
					print("<div class="+ str(itemDict['priority']) +">")
				except KeyError:
					print("<div>")
					continue					
				finally:
					print("<input type=checkbox name="+str(todoItem)+">"+str(itemDict['task'])+"</input>")
					print("<br>")
					print("</div>")	
except IOError as er:
	print ('''<h1>Cant open file!</h1>"''')
print ('''</body>''')

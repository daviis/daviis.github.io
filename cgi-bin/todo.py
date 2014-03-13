#!/home/students/daviis01/cs365/todoenv/bin/python3

import yaml

print ("Content-type: text/html")
print ("")
print ('''<head>
	</head>
	<body>''')
try:
	aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/list.txt")
	aDict = yaml.load(aFile)	
	print("<h1>ToDo!</h1>")
	print(type(aDict))
#	for line in aFile:
#		print ("<input type=checkbox>" + line + "<br>")
except IOError as er:
	print ('''<h1>Cant open file!</h1>"''')
	raise er
print ('''</body>''')

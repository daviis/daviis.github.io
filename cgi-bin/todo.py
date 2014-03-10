#!/usr/bin/python

print "Content-type: text/html"
print ""

print "<h1>ToDo!</h1>"
aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/list.txt")
for line in aFile:
	print "<input type=checkbox>" + line + "<br>"



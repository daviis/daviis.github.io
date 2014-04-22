#!/usr/bin/env python3

import yaml
import os
import string

def makeChanges():
	if 'QUERY_STRING' in os.environ:
		if os.environ["QUERY_STRING"] != "":
			query = os.environ["QUERY_STRING"].split('&')
			queryList = []
			for item in query:
				for sub in item.split('='):
					queryList.append(sub)
			queryDict = dict(queryList[i:i+2] for i in range(0, len(queryList), 2))
			try:
				aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/todo.dat")
				aDict = yaml.load(aFile)
				newIdNum = 1
				for item in aDict:
					try:
						for subItem in aDict[item]:
							newIdNum += 1
					except:
						pass 
				print("start dict ", aDict)
				for key in queryDict:
					project = "home"
					if queryDict[key] == 'on':
						print("in del")
						for pro in aDict:
							if aDict[pro] != None and  aDict[pro] != {}:
								for sub in aDict[pro]:
									if (str(sub) == str(key)):
										print("found the right project ", pro)
										project = pro
						print(project)
						if aDict['done'] == None:
							aDict['done'] = {}
						print(aDict[project])
						print("len of proj is :",len(project), "len of ", project)
						if int(key) in aDict[project]:
							print("in del from ", aDict[project], " ", key)
							print("the deleted stuff ", aDict[project][int(key)])
							aDict['done'][int(key)] = aDict[project][int(key)]
							del (aDict[project][int(key)])	
					elif queryDict['newItemMsg'] != '':
						newTask = {}
						newTask['task'] = queryDict["newItemMsg"].replace('+', ' ')
						try:
							aDict[queryDict['newItemCat']][newIdNum] = newTask
						except TypeError as ex:
							aDict[queryDict['newItemCat']] = {}
							aDict[queryDict['newItemCat']][newIdNum] = newTask
				print("res dict ", aDict)
				aFile.close()
				aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/todo.dat", "w")
				aFile.write(yaml.dump(aDict, default_flow_style=False))
				aFile.close()	
			except Exception as ex:
				raise ex


def makeWebpage():
	print ("Content-type: text/html")
	print ("")
	print ('''<head>
		<link rel="stylesheet" type="text/css" href="../theme.css">
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery.js"></script>
		<script src="../todo/checked.js"></script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
		<title>TODO</title>
		</head>
		<body>''')
	try:
		aFile = open("/home/students/daviis01/cs365/daviis.github.io/todo/todo.dat")
		aDict = yaml.load(aFile)
		print("<header><h1>ToDo!</h1></header>")
		print("<form>")
		for key in sorted(aDict):
			print("<h3>"+key+"</h3>")
			if(aDict[key] != None):
				for todoItem in aDict[key]:
					try:
						itemDict = aDict[key][todoItem]
				#		print("<div class="+ str(itemDict['priority']) +">")
						print("<div id=", todoItem, ">")
					except KeyError:
						print("<div id=", todoItem, ">")
						continue					
					finally:
						print('''<input type=checkbox class="checkboxItem" id=''', todoItem, ''' name=''', todoItem, '''>''')
						print('''<label for=''', todoItem, '''class="lableCheckbox">''')
						print( itemDict['task'])
						print('''</label>''')
					#	print("<p>", itemDict['task'], "</p>")
						print("</input>")
						print("</div>")

		makeNewItem(aDict)
		print('''<input type="submit" text="Submit">''')
		print("</form>")	


	except IOError as er:
		print ('''<h1>Cant open file!</h1>"''')
	print ('''</body>''')

def makeNewItem(aDict):
	print('''<div id="newItemArea">''')
	print('''<h3>Make a new todo</h3>''')
	print('''<select name="newItemCat">''')
	for item in sorted(aDict):
		if item != 'done':
			print('''	<option value=''' + item + '''>''' + item + '''</option>''')
	print('''<input name=newItemMsg type=text></input>''')
	print('''</div>''')


makeChanges()
makeWebpage()


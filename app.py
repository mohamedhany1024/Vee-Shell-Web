from flask import Flask, render_template, jsonify, request, send_file, send_from_directory
from collections import deque
import platform, subprocess, re, os, shutil

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


f2 = open("currentWallpaper.txt", "r")

wallpaper = f2.read()
working_dir = os.getcwd()

	
	







stat = shutil.disk_usage('/')
stGig = stat[0]
frGig = stat[2]

for i in range(3):
	stGig /=1024
	frGig /=1024
	
frGig = round(frGig, 1)
stGig = round(stGig, 1)
usGig = stGig - frGig
usGig = round(usGig, 1)



	
@app.route('/')

def index():
	return render_template("index.html")

#music indexing phase
unopened_dirs = deque([os.path.expanduser("~/Music")])
print(unopened_dirs[0])
audio_extenions =["3gp", "ogg", "mp3", "m4a", "wav"]
audio_files = []
os.chdir(unopened_dirs[0])

depth = 10
while len(unopened_dirs) >= 1:
	
	current_dir = unopened_dirs[0]
	os.chdir(unopened_dirs[0])
	for dir in os.listdir(unopened_dirs[0]):
		
		if os.path.isfile(dir):
			
			if dir.endswith(tuple(audio_extenions)):
				audio_files.append([dir, current_dir + "/" + dir])
				#os.symlink(current_dir + "/" + dir, working_dir+"/static/symlinks/"+dir)
				
		else:
			
			unopened_dirs.appendleft(current_dir + "/" + dir)
			

	unopened_dirs.remove(current_dir)
	depth-=1
	
os.chdir(working_dir)
#os.chdir("../")
@app.route('/home')

def home():
	return render_template("home.html", wallpaper=wallpaper)
	
@app.route('/settings')

def settings():
	memBytes = os.sysconf('SC_PAGE_SIZE') * os.sysconf('SC_PHYS_PAGES')
	memGig = 0
	x = 0
	while x in range(7):
		memGig = memBytes/1024
		memGig = memGig/1024
		memGig = memGig/1024
		memGig = round(memGig, 1)
		
		x += 1
	cpu = ": Unknown CPU Model"
	command = "cat /proc/cpuinfo"
	returnedValue = subprocess.check_output(command, shell=True).strip().decode()
	for line in returnedValue.split("\n"):
		if "model name" in line:
			cpu = line
	return render_template("settings.html", cpu=cpu, memGig=memGig, wallpaper=wallpaper, stGig=stGig, frGig=frGig, usGig=usGig)
	
@app.route('/calc')
def calc():
	return render_template("calc.html", wallpaper=wallpaper)
	
@app.route('/dialler')

def dialler():
	return render_template('dialler.html', wallpaper=wallpaper)
	
@app.route('/browser')

def browser():
	return render_template('browser.html', wallpaper=wallpaper)

@app.route('/music')

def music():
	return render_template('music.html', wallpaper=wallpaper)

@app.route('/music/<string:filename>', methods=['GET'])

def musicProvider(filename):
	for i in range(0, len(audio_files)):
		if audio_files[i][0] == filename:
			if request.method == 'GET':
				print(audio_files[i][1])
				return send_file(audio_files[i][1])
	
	

@app.route("/settings/<string:wall>")

def wallpaperSetter(wall):
	ddir = os.getcwd()
	print("dir: " + str(ddir))
	f = open("currentWallpaper.txt", "r+")
	f.truncate(0)
	
	f.write(wall + ".jpg")
		
	return render_template("changes.html")

@app.route('/restart')

def restart():
	
	return "Restarting"

@app.route('/listMusic')

def listMusic():
	return jsonify(audio_files)


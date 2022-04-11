from flask import Flask, render_template
import platform, subprocess, re, os, shutil

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

f2 = open("currentWallpaper.txt", "r")
wallpaper = f2.read()

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

@app.route("/<string:wall>")

def wallpaperSetter(wall):
	f = open("currentWallpaper.txt", "r+")
	f.truncate(0)
	
	f.write(wall + ".jpg")
		
	return render_template("changes.html")

@app.route('/restart')

def restart():
	
	return "Restarting"

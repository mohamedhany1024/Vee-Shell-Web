from flask import Flask, render_template
import platform, subprocess, re, os

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

f2 = open("currentWallpaper.txt", "r")
wallpaper = f2.read()
os.system("firefox 127.0.0.1:5000/")
def restartBackend():
	os.system("gnome-terminal -e ./restart.sh")

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
		print("Memory Size In Gigabytes: ")
		print(memGig)
	command = "cat /proc/cpuinfo"
	returnedValue = subprocess.check_output(command, shell=True).strip().decode()
	for line in returnedValue.split("\n"):
		if "model name" in line:
			cpu = line
	return render_template("settings.html", cpu=cpu, memGig=memGig, wallpaper=wallpaper)
	
@app.route('/calc')
def calc():
	return render_template("calc.html", wallpaper=wallpaper)
	
@app.route('/dialler')

def dialler():
	return render_template('dialler.html', wallpaper=wallpaper)
	
@app.route('/browser')

def browser():
	return render_template('browser.html')

@app.route("/<string:wall>")

def wall(wall):
	f = open("currentWallpaper.txt", "r+")
	f.truncate(0)
	print("Wallpaper Name " + wallpaper)
	if wall == "outOfFocus":
		f.write("outOfFocus.jpg")
		f.close()
		restartBackend()

	elif wall == "droplet":
		f.write("droplet.jpg")
		f.close()
		restartBackend()
	
	elif wall == "wall2":
		f.write("wall2.jpeg")
		f.close()
		restartBackend()

	elif wall == "pinkFlower":
		f.write("pinkFlower.jpg")
		f.close()
		restartBackend()

	elif wall == "plantPot":
		f.write("plantPot.jpg")
		f.close()
		restartBackend()
	
	elif wall == "risingSun":
		f.write("risingSun.jpg")
		f.close()
		restartBackend()
	return render_template("settings.html")

@app.route('/restart')

def restart():
	restartBackend()
	return "Restarting"

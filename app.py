from flask import Flask, render_template
import platform, subprocess, re, os

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')

def index():
	return render_template("index.html")
	
@app.route('/home')

def home():
	return render_template("home.html")
	
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
		
		x += 1;
		print(memGig)
	command = "cat /proc/cpuinfo"
	returnedValue = subprocess.check_output(command, shell=True).strip().decode()
	for line in returnedValue.split("\n"):
		if "model name" in line:
			cpu = line
	return render_template("settings.html", cpu=cpu, memGig=memGig)
	
@app.route('/calc')
def calc():
	return render_template("calc.html")
	
@app.route('/dialler')

def dialler():
	return render_template('dialler.html')
	
@app.route('/browser')

def browser():
	return render_template('browser.html')

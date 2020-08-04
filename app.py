from flask import Flask, render_template
import platform, subprocess, re

app = Flask(__name__)

@app.route('/')

def index():
	return render_template("index.html")
	
@app.route('/home')

def home():
	return render_template("home.html")
	
@app.route('/settings')

def settings():
	command = "cat /proc/cpuinfo"
	returnedValue = subprocess.check_output(command, shell=True).strip().decode()
	for line in returnedValue.split("\n"):
		if "model name" in line:
			cpu = line
	return render_template("settings.html", cpu=cpu)
	
@app.route('/calc')
def calc():
	return render_template("calc.html")
	
@app.route('/dialler')

def dialler():
	return render_template('dialler.html')
	
@app.route('/browser')

def browser():
	return render_template('browser.html')

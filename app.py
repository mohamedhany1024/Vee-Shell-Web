from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')

def index():
	return render_template("index.html")
	
@app.route('/home')

def home():
	return render_template("home.html")
	
@app.route('/settings')

def settings():
	return render_template("settings.html")
	
@app.route('/calc')
def calc():
	return render_template("calc.html")
	
@app.route('/dialler')

def dialler():
	return render_template('dialler.html')
	
@app.route('/browser')

def browser():
	return render_template('browser.html')

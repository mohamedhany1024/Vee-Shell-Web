from flask import Flask, render_template, jsonify, request, send_file, send_from_directory
from collections import deque
import platform, subprocess, re, os, shutil
from sys_info import *
from music_searcher import indexMusic
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


f2 = open("currentWallpaper.txt", "r")

wallpaper = f2.read()
working_dir = os.getcwd()


diskInfo = getDiskInfo()
audio_files = indexMusic()
cpu = getCpuName()
memGig = getSystemMemory()

	
@app.route('/')

def index():
	return render_template("index.html")



@app.route('/home')

def home():
	return render_template("home.html", wallpaper=wallpaper)
	
@app.route('/settings')

def settings():
		return render_template("settings.html", cpu=cpu, memGig=memGig, wallpaper=wallpaper, stGig=diskInfo[1], frGig=diskInfo[0], usGig=diskInfo[2])
	
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


if __name__ == "__main__":
    app.run(debug=True, extra_files=['currentWallpaper.txt'])

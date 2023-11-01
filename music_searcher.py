from collections import deque
import platform, subprocess, re, os, shutil

def indexMusic():
	working_dir = os.getcwd()
	try:
		unopened_dirs = deque([os.path.expanduser("~/Music")])
		os.chdir(unopened_dirs[0])
	except:

		os.mkdir(os.path.expanduser("~") + "/Music")

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
	return audio_files

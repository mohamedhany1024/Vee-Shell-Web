from collections import deque
import platform, subprocess, re, os, shutil



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

def getDiskInfo():
    return [frGig, stGig, usGig]

def getCpuName():
	cpu = ": Unknown CPU Model"
	command = "cat /proc/cpuinfo"
	returnedValue = subprocess.check_output(command, shell=True).strip().decode()
	for line in returnedValue.split("\n"):
		if "model name" in line:
			cpu = line
	return cpu

def getSystemMemory():
	memBytes = os.sysconf('SC_PAGE_SIZE') * os.sysconf('SC_PHYS_PAGES')
	memGig = 0
	x = 0
	while x in range(7):
		memGig = memBytes/1024
		memGig = memGig/1024
		memGig = memGig/1024
		memGig = round(memGig, 1)
		
		x += 1
	return memGig

# CSCI3428: Saint Mary's University - Software Engineering
This service-learning project for AutismNS is brought to you by Group #2: 
Bivash Pandey, Jay Patel, Justin Gray, Nikhil Bhardwaj, Nicholas Morash, and Tiffany Conrad.

# Benefits of Our Group's Software

# Installation
To install and run this code, you need to have the following dependency programs installed:
1. MongoDB Community: https://www.mongodb.com/try/download/community
2. NodeJS v14: https://nodejs.org/en/download/

Now you can set-up our software.
1. Download the source code from https://github.com/just1ngray/CSCI3428/archive/master.zip, or `git clone https://github.com/just1ngray/CSCI3428.git`
2. Open a terminal window in the unzipped folder and type: `npm run install-all`
3. Now everything is installed and you can run the website (see steps 3a-3b). However, you will have to keep your terminal windows open whenever you 
run the website, so continue to step 4 to resolve this issue.  
    a) In one terminal window, type `npm run server`,  
    b) And in another terminal window, type `npm run client`
4. To run the website in the background, you will have to run some additional commands. If you have super-user permissions please continue to step 6,
otherwise continue with step 5.
5. Using `nohup`, you can run the website in the background.  
    Step 1) `nohup node index > log.out &`  
    Step 2) `exit`  
    Step 3) `nohup npx next start > log.out &`  
    Step 4) `exit`  
    Step 5) To stop the website (or refresh after modifying the code), find the PID `ps -ef | grep node` and kill it using `kill -9 <PID>` where <PID>
    is the PID of the process you want to kill.
6. Install a npm package such as `forever` or `pm2`. This guide will show `pm2`:
    Step 1) `sudo npm install pm2 -g`

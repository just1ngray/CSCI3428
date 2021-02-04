# CSCI3428: Saint Mary's University - Software Engineering
This service-learning project for AutismNS is brought to you by Group #2:  
Bivash Pandey, Jay Patel, Justin Gray, Nikhil Bhardwaj, Nicholas Morash, and Tiffany Conrad.

# Features
- A simplified email training application
- Unlimited* number of specialist sign-ups
- Unlimited* number of students managed by each specialist
- Address Book for all your contacts
- Support tools such as the help page, confirmation checkboxes, and hoverable instructions
- Theme customization under the `Settings` page

*Unlimited if you have infinite storage space and MongoDB can grow forever. In practical use, you shouldn't run out of space

# Installation
To install and run this code, you need to have the following dependency programs installed:
1. MongoDB Community: https://www.mongodb.com/try/download/community
2. NodeJS v14: https://nodejs.org/en/download/

Now you can set-up our software.
1. Download the source code from https://github.com/just1ngray/CSCI3428/archive/master.zip, or `git clone https://github.com/just1ngray/CSCI3428.git`  
    > If you are running a production server, please change the `./client/utils/defaults.js` file to export the proper `serverUrl`. By default, all HTTP requests will be targetted at `http://localhost:3385/api`.
2. Open a terminal window in the [unzipped] folder and type: `npm run install-all`. This may take a while depending on your internet connection speed.
3. Now everything is installed and you can run the website using `node index.js`. However, the website will only run as long as you keep the terminal open, so continue on to step 4 (if you have sudo privileges), or step 5 (if you don't have sudo privileges).
4. With sudo privileges, type `sudo npm install -g pm2`. Then to run the website, `pm2 start index.js --name "email-app"`. Once you've initially added the `index.js` file to pm2's watchlist, you can:  
    a) `pm2 stop email-app` to stop the website  
    b) `pm2 status` to show the status of the website  
    c) `pm2 monit` to see advanced monitoring information regarding the website  
    d) `pm2 start email-app` to start a stopped website  
    e) `pm2 restart email-app` to restart the website
5. Without sudo privileges, you'll have to use nohup:  
    a) `nohup node index > log.out &`, then `exit`  
    b) To stop the website (or refresh after modifying the code), find the PID `ps -ef | grep node` and kill it using `kill -9 <PID>` where <PID> is the PID of the process you want to kill.

# Default Accounts
You should *not* use these accounts for permanent use. Instead, please:
1. Create a specialist account, and
2. Create a (or more) student account(s) within the specialist's dashboard

Account | Username/Email | Password
--- | --- | ---
Specialist | specialist@autismns.ca | password
Student | student@autismns.ca | password


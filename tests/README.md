# Automated Testing

#### How to run automated tests
1. Install python & selenium module
2. Install the selenium chromedriver and put it in the `./tests` folder
3. Start the development server (tests are targetted at the development server since they should be run **before** pushing to production)  
    a. `git clone https://github.com/just1ngray/CSCI3428.git`  
    b. `npm run install-all`  
    c. `node index.js` and `npm run dev` in two separate terminal windows
4. From the `./tests` directory, run `python ./<test file name>.py`  
    > Tests are expected to run in desktop mode where the navigation bar is wide (not hamburger button). Please ensure your testing browser window is sufficiently wide to display the navigation buttons without the hamburger.

# Automated Testing

#### How to run automated tests
1. Install python & selenium module
2. Install the selenium chromedriver and put it in the `./tests` folder
3. Start the development server (tests are targetted at the development server since they should be run **before** pushing to production)  
    a. `git clone https://github.com/just1ngray/CSCI3428.git`  
    b. `npm run install-all`  
    c. `node index.js` and `npm run dev` in two separate terminal windows
4. From the `./tests` directory, run `python ./<test file name>.py`

#### Instructions for group members

- Use the `tester@autismns.ca` and `password` account for testing

- Groups of 1 - 2 allowed

- Each group should add their .py test to the "tests" folder in the root directory of our GitHub. I don't care how you name it, but make sure you have a header comment saying who is responsible for this file.

- Each .py file should test for (at least):

1. Missing or incorrect data being displayed
2. Full stack integration errors
   - Client/Server validation mismatch
   - Inconsistent field sizes (eg. DB field too small)
   - Data mapping errors 
3. User Experience
   - Flow and navigation errors
   - Validation and help message errors

Please see OnlineFall3428pytst slideshow for details

# Automated Testing Software by Bivash Pandey & Justin Gray
# Targetted to test the Address Book using Selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ECS
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome("./tests/chromedriver")

URL = "http://localhost:3000"

#           ---[ LOGIN TO THE WEBSITE ]---
driver.get(URL)
driver.find_element_by_name("name").send_keys("tester@autismns.ca")
driver.find_element_by_name("password").send_keys("password")
driver.find_element_by_tag_name("button").click()

time.sleep(3)


#           ---[ User Experience: Flow and navigation errors ]---
# Going to the /AddressBook path should load the address book
driver.find_element_by_link_text('Address Book').click()
time.sleep(3)
assert URL + "/AddressBook" == driver.current_url, "flow to AddressBook was not successful!" + driver.current_url


#           ---[ Full stack integration errors: Inconsistent field sizes ]---
# Trying to add a contact with name length > 128 won't be accepted by backend
# ASSERT: correct length of an user name
stringLength = 128
contactName = driver.find_element_by_name("contactName")
contactName.send_keys("a" * (stringLength + 10))
assert len(contactName.get_attribute("value")) <= stringLength, "ERROR: length of username excess the limit!"


#           ---[ Full stack integration errors: Client/Server validation mismatch ]---
# Trying to add a contact without an email address (this is a required field)
contactEmail = driver.find_element_by_name("contactEmail")
contactEmail.send_keys("ans") # an invalid email address
driver.find_element_by_tag_name("button").click()
assert len(contactName.get_attribute("value")) > 0, "ERROR: Created an invalid contact!"


#           ---[ User Experience: validation and help message errors ]---
# Add a contact if fields are validated (should add it to the table & persist through a refresh)
contactEmail.send_keys("@test.com") # now contactEamil should be ans@test.com
checkName = contactName.get_attribute("value")
checkEmail = contactEmail.get_attribute("value")
driver.find_element_by_tag_name("button").click()
time.sleep(3)

# To make sure that the fields are empty after contact is created
assert len(contactName.get_attribute("value")) == 0, "ERROR: Did not reset name field!"
assert len(contactEmail.get_attribute("value")) == 0, "ERROR: Did not reset email field!"


#           ---[ Full stack integration errors: Data mapping errors ]---
# assert that the contact was added to the table
contactRows = driver.find_elements_by_class_name("auto-test-selector-contactrow")
# find the index where the new information has been added
rowIndex = -1 
for contactIndex in range(1, len(contactRows)):
    innerHTML = contactRows[contactIndex].get_attribute("innerHTML")
    if checkName in innerHTML and checkEmail in innerHTML:
        rowIndex = contactIndex
        break

assert rowIndex > -1, "ERROR: Contact was not displayed in the table!"
assert rowIndex == len(contactRows) - 1, "ERROR: Contact should be added to the bottom of the list!"


#           ---[ Missing or incorrect data being displayed ]---
# Delete the data and assert that it's gone

remove = contactRows[rowIndex].find_element_by_tag_name("button")
remove.click()
time.sleep(3)

# verify it DNE on the local state
contactRows = driver.find_elements_by_class_name("auto-test-selector-contactrow")
rowIndex = -1
for contactIndex in range(1, len(contactRows)):
    innerHTML = contactRows[contactIndex].get_attribute("innerHTML")
    if checkName in innerHTML and checkEmail in innerHTML:
        rowIndex = contactIndex
        break
assert rowIndex == -1, "ERROR: Contact data was not deleted locally!"

# verify it DNE on the database
driver.refresh()
time.sleep(3)

contactRows = driver.find_elements_by_class_name("auto-test-selector-contactrow")
rowIndex = -1
for contactIndex in range(1, len(contactRows)):
    innerHTML = contactRows[contactIndex].get_attribute("innerHTML")
    if checkName in innerHTML and checkEmail in innerHTML:
        rowIndex = contactIndex
        break

assert rowIndex == -1, "ERROR: Contact was not deleted from the backend!"

print("All tests passed! Closing the testing window in 5 seconds...")
time.sleep(5)
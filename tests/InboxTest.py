# Automated Testing Software by Jay Patel (A00433907)
# Targetted to test the Inbox page using Selenium
# Note: This test does not contain Inconsistent field size test
#       since Inbox page do not have anything test about it.

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ECS
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
driver = webdriver.Chrome("chromedriver.exe")
driver.set_window_size(1280, 720)

# VARIABLES
testerId = "tester@autismns.ca"
testerPw = "password"
#   variables used for asserts
url = "http://localhost:3000/"
urlInbox = "http://localhost:3000/Inbox"
urlViewEmail = "http://localhost:3000/ViewEmail"
urlCompose = "http://localhost:3000/Compose"
urlSentItems = "http://localhost:3000/SentItems"
urlHelp = "http://localhost:3000/Help"
noEmailsMessage = "No emails match your search" 
searchSubject = "Second test "
flagClassBeforeClick = "button is-warning is-light"
flagClassAfterClick = "button is-warning "


#Load the website
driver.get("http://localhost:3000")

#waiting to load
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Going to the url(variable) path should load the Sign in page
assert url == driver.current_url, "http://localhost:3000/ is not the current webpage!"


#           ---[ LOGIN TO THE WEBSITE ]---
elem = driver.find_element_by_name("name")
elem.send_keys(testerId)
elem = driver.find_element_by_name("password")
elem.send_keys(testerPw)
time.sleep(2)
elem = driver.find_element_by_tag_name("button")
elem.click()
time.sleep(3)

#           ---[ User Experience: Flow and navigation errors ]---
# On succesful sign in, the user should be taken to Inbox page
assert urlInbox == driver.current_url, "http://localhost:3000/Inbox is not the current webpage!"

#           ---[ Full stack integration errors: Data mapping errors ]---
# Tests Search bar
elem = driver.find_element_by_tag_name("input")
elem.send_keys("Second Test")

#waiting for tester to notice
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Clicking on email takes user to ViewEmail page displaying that email
elem = driver.find_element_by_tag_name("button")
elem.click()
time.sleep(3)
assert urlViewEmail == driver.current_url, "http://localhost:3000/ViewEmail is not the current webpage!"

#           ---[ Full stack integration errors: Data mapping errors ]---
# Tests if it is the same email that was clicked
elem= driver.find_elements_by_class_name("field")[3].find_element_by_tag_name("textarea").get_attribute("value")
assert elem == searchSubject, "'Second test' is not the subject of the email open and so not the correct email opened!"


# click the browser back button
driver.back()
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Back to Inbox page
assert urlInbox == driver.current_url, "http://localhost:3000/Inbox is not the current webpage!"
time.sleep(2)

#           ---[ User Experience: validation and help message errors, Missing or Incorrect data being displayed ]---
# Tests if search bar did reset
assert len(driver.find_element_by_tag_name("input").get_attribute("value")) == 0, "Search bar did not reset!"

#           ---[ User Experience: validation and help message errors, Missing or Incorrect data being displayed ]---
# Tests the message when there are no emails similar to what searched in search bar
elem = driver.find_element_by_tag_name("input")
elem.send_keys("!@#$%^&*())_+") #Most probably, there will be no emails such as this
elem = driver.find_element_by_class_name("box") # Div containing message of no similar emails found
def is_articles_not_found():
    try:
        return WebDriverWait(driver, 3).until(lambda driver: elem.text == "No emails match your search")
    except TimeoutException:
        return "'No emails match your search' is not the message displayed!"
#waiting for tester to notice
time.sleep(2)


#           ---[ User Experience: Flow and navigation errors ]---
# Clicking Sent Items button should navigate user to Sent Items page
elem = driver.find_element_by_xpath("//div[@class='buttons']//button[contains(text(), 'Sent Items')]")
elem.click()
# waiting to load 
time.sleep(2)
assert urlSentItems == driver.current_url, "http://localhost:3000/SentItems is not the current webpage!"

# waiting for tester to notice in gui
time.sleep(2)

#Clicking browser back button
driver.back()
# waiting to load 
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Loaded Inbox page correctly
assert urlInbox == driver.current_url, "http://localhost:3000/Inbox is not the current webpage!"

#           ---[ User Experience: Flow and navigation errors ]---
# clicking Compose button should take  user to Compose page
elem = driver.find_element_by_xpath("//div[@class='buttons']//button[contains(text(), 'Compose')]")
elem.click()
#waiting to load
time.sleep(3)
assert urlCompose == driver.current_url, "http://localhost:3000/Compose is not the current webpage!"

# Wait for tester to notice in gui
time.sleep(2)

#Clicking browser back button
driver.back()
# waiting to load 
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Back to Inbox page
assert urlInbox == driver.current_url, "http://localhost:3000/Inbox is not the current webpage!"

#           ---[ User Experience: Flow and navigation errors ]---
# clicking Help button should laod Help page
elem = driver.find_element_by_xpath("//div[@class='buttons']//button[contains(text(), 'Help')]")
elem.click()
#waiting to load
time.sleep(2)
assert urlHelp == driver.current_url, "http://localhost:3000/Help is not the current webpage!"

# waiting fo tester to notice in gui
time.sleep(2)

#Clicking browser back button
driver.back()
# waiting to load 
time.sleep(2)

#           ---[ User Experience: Flow and navigation errors ]---
# Back to Inbox page
assert urlInbox == driver.current_url, "http://localhost:3000/Inbox is not the current webpage!"

#           ---[ Full stack integration errors: Client/Server validation mismatch ]---
# Testing flag data for an email
elem = driver.find_elements_by_tag_name("button")[1]
elem.click()
#After reloading, data is fecthed from backend. So testing flag occurance
driver.refresh()
time.sleep(2)
elem = driver.find_elements_by_tag_name("button")[1]
assert flagClassAfterClick == elem.get_attribute("class"), "'button is-warning' is not the class of flag. So flag is not set!"
time.sleep(2)
elem.click()
time.sleep(2)
assert flagClassBeforeClick == elem.get_attribute("class"), "'button is-warning is-light' is not the class of flag. So flag is still set!"
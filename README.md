# TypeScript login authenticaion system

Using TypeScript, this small web application allows users to register new accounts, log in with existing accounts, and view profile information. User data is stored locally in the browser using localStorage, and passwords can be toggled between hidden and visible on the profile page.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Install Node.js
2. Intall typescript compiler by running "npm install -g typescript" in the terminal
3. Complie typescript files into javascript by running "tsc" in the terminal
4. open "index.html" in a browser window

Instructions for using the software:

1. Open the homepage
2. Enter a username and password, then click register to create a new account
3. Enter credentials again and press login
4. If login is successful, you will be directed to the profile page
5. On the profile page, you can click "Show Password" or "Hide Password" to toggel visibility

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js (v16 reccomended)
* TypeScript (v4+)
* A modern we browser (chrome, firefox, edge, etc)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* TypeScript Official Docs
*

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Ability to change username or password
* [ ] Encrypt or hash password and put username and passwords in a database
* [ ] Add logout functionality
* [ ] Add password strength validation

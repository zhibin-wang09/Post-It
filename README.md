# Project Name: Digital Post It #
Digital Post it is a simple note-taking extension that allows you to take notes on any website. The notes will be organized base on the current tab. You will never be afraid of losing your note because it is attached to the WEBSITE!!!

## Disclaimer ##
The extension will obtain **informations** on your most **recent** tab **address**. Due to the necessity of fetching notes from the database to obtain the corresponding notes of the website.

## Instruction ##
1) Clone the project
2) type "npm install" in the terminal
3) Create a database on Mongodb, check mongodb website for instruction
4) Copy the connection string
5) Replace the connection string with the one in server.js
6) Create a .env file in the same directory as the server.js
7) Enter your unique USER_NAME and USER_PASSWORD string from mongodb to .env file
8) Head into client folder
9) type "npm install" then "npm run build"
10) Head over to chrome
11) Manage extension
12) Toggle on developer mode
13) Load unpack the client folder
14) You're good to go.

## Direction ##
![Note taken on github.com](./img/Ex1.png?raw=true "Post It on github.com")
*The example note is taken on the github.com. The note is taken and fetched according to the base URL.*
1. Enter the title of the note
2. Enter the body of the note
3. Click Save
4. Note will be rendered To the popup!!!

### How To Edit ###
![Editing a Note](./img/Edit.png "Editing a note")
1. Click the edit button
2. Type in any new information
3. Click update

# Startup Project

## Elevator Pitch

I will create a website for students that combines assignment tracking, time management, and grades received. This will enable students to create daily schedules, check off completed tasks, and keep track of their grades, all on the same website.

## Key Features

Key features include:
- Account Creation and Sign In
- Assignment Creation
- Course Creation
- Grade Tracking
- Due Date Tracking
- Option to Share Course Completion Percentage with Others

## Technology Use

### HTML/CSS
Used to display the webpage to users.

### JavaScript/React
Provides framework for buttons and user interaction.

### Service
Backend service with endpoints for:
- Securely storing and retrieving academic information
- Handling login requests
- Storing custom course grading scales and assignment types

### DB/Login
Stores users, assignments, and grades in a database. Registers and logs in users. Securely stores credentials and academic information.

### WebSocket
Allows optional sharing of course/assignment completion with other users.

## Rough Sketch

![Example Image](website_sketch.jpg)

### Deployment of initial HTML files
Created the initial html files for each page of the site, including some functional links between the pages. Used the code in deployFiles.sh to deploy it to the site with the following command : ./deployFiles.sh -k ../Diddlywhack_Doodad.pem -h jlarson.click -s startup


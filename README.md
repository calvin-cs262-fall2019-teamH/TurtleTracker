# Turtle Tracker: Vision Statement

The box turtle is a threatened species and the Turtle Tracker project will allow the Calvin Ecological Preserve to do their part in protecting the species by providing a digital turtle tracking service which will increase efficiency in tracking while also providing digital sharing of data. Currently, the ecological preserve workers have a physical book to keep track of all the turtles on site and need to take turtles back to their office whenever one is found, but by creating a digital, time-saving alternative, the workers will be able to track turtles using fewer resources than before. The project will consist of a mobile smartphone application that will allow users to keep track of the turtles while on-the-go. When a turtle is found in the preserve, they will create a digital turtle entry (or profile) using their phone which will mark the turtle’s identity and location, along with a photo and other secondary data points. The mobile application will automatically connect to another application that manages saving the turtle data. If a turtle has already been marked in the application, the turtle entry will be updated. Workers in the preserve will be able to use the application to look at a list of all marked turtles and delete turtles if necessary. In addition, there will be a way to search the turtle list within the mobile application.
       
This project needs to have an easy-to-use, cross-platform, mobile front-end so we will be using Javascript with React Native. This mobile application will be the way the preserve workers search, update, and add turtles to the turtle list. In order to share data between users, there will be another application for the back-end, built using Node.js with Express.js and hosted on Heroku, which serves as the API and get information from the turtle database, created using PostgreSQL and hosted on ElephantSQL. The front-end application will use the API to share the turtle list data to all users. If extra security is deemed necessary, users will have to use their Calvin Google accounts to sign in (following the OAuth 2.0 scheme).

# [Wiki](https://github.com/calvin-cs262-fall2019-teamH/TurtleTracker/wiki)

# Running the App
To view a working build of the `master` branch, checkout this [Snack](https://snack.expo.io/@git/github.com/calvin-cs262-fall2019-teamH/TurtleTracker)

(Please note that snack.expo.io is buggy at times and the preview might fail the run. This does not reflect the current state of our project.)

To run the front-end app locally, run `npm start` and scan the QR Code using the [Expo App](https://apps.apple.com/app/apple-store/id982107779?amp%3Bct=www&amp%3Bmt=8&pt=17102800). 
Note you may need to run `npm install` the first time you run the app.


# Shell Squad
* David Dahms
* Jonathan Ellis
* Charles Kornoelje
* Alex McDowell
* Jonathan Winkle

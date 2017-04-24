# Exercise-Tracker
A simple web exercise tracker. Data is stored in Oregon state's SQL database and updates are made through AJAX calls.

##Accessibility
To access the SQL database, user must be VPNed into Oregon State's Engineering server. 
Node must be installed on user's computer. Can be done through the command npm install. Express and express-handlebars are also required.

##Running Program
Once all the folders/files are downloaded and node is installed, user can then access the exercise tracker by running "node workout.js" in their command window. The exercise tracker is defaulted to http://localhost:4300. User can then enter their workouts, update them, or delete them from the site. The data can also be reset by going to "http://localhost:4300/reset-table". 

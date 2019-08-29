# TieCo

# TODO

- [x] Get the GET/POST/DELETE/UPDATE requests working on /api/teachers

- [x] Connect the api with the count of teachers to be displayed on the landing page dynamically depending on the database

- [x] Submit the GET requests using the information from the dropdown menus

- [x] Submitting the form to the database

- [ ] Fix flash messages/express-validator on user signup

- [ ] Consider the subject in the query

- [ ] SIGNUP/LOGIN in order to submit the form

- [ ] A seperate route for admins to be able to easily make post/delete/update requests

- [ ] Add the day in the form to the query. Right now it is assumed that every teacher is free to teach at a specific time everyday.

- [ ] Better form look and polishing

# Problems

Fetching the data:

    Possible Solutions:

    	- waiting for the data to be fetched entirely then loading the page and passing the data to the ejs file (slows down the website)

    	- Learning and using Ajax to make fetch requests on the client side and update the DOM without having to reload the page (Good solution but needs learning Ajax)

User signin before submitting the form:

    Possible Solutions:

    	- Make a schema for signup through mongoose and add it to the database and compare documents on login.(Not very flexable)

    	- Using passport js to handle the authentication.(Need to read on passportjs but seems to be more reliable)

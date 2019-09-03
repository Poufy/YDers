# TieCo

# TODO

- [x] Get the GET/POST/DELETE/UPDATE requests working on /api/teachers

- [x] Connect the api with the count of teachers to be displayed on the landing page dynamically depending on the database

- [x] Submit the GET requests using the information from the dropdown menus

- [x] Submitting the form to the database

- [x] Fix flash messages/express-validator on user signup

- [x] Put the secret and the mongo url in a seperate folder

- [x] Perform the form POST request from the front-end and send the info about the logged in user along with it

- [ ] Prevent duplicate signups with the same email/username

- [ ] Add Multiple passport strategies (Facebook, Google)

- [x] Consider the subject/day/time in the query

- [x] SIGNUP/LOGIN in order to submit the form

- [x] A seperate route for admins to be able to easily make post/delete requests

- [x] Add the day in the form to the query. Right now it is assumed that every teacher is free to teach at a specific time everyday.

- [ ] Better looking flash messages

- [ ] Admin table of current avaiable times and requests available

- [ ] Fix materializer error/Fail get error after admin/form submission

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

Form validation:

    Possible Solutions:

    	- Check the input in the front-end and don't allow the submission unless the data conforms to some rules. (Not very secure but easier to implement and results in cleaner code)

    	- Validate the input in the backend using express-validator (More secure but results in uglier code and more troublesome to implement)

I went with a mixture of both where I validated the main submission form on the landing page in the front-end, and did the signup with the backend using express-validator. Nevermind, I changed both to back end but might change it again later. (update this in the future).

Saving Inputs When Logged Out:

    Possible Solutions:

    	- Find some way to store the current session even when not logged in and reload the session when user logs back in.

    	- Just do the logging in in the front-end using an ajax request without having to reload the page.

Displaying forms to the admins that only match their available times and day:

    Possible Solutions:

    	- Using the Teacher model find all the times and days that admins entered(name and lastname of teachers and admins match). However, this will become very complex with larger data.

    	- Filtering the data in the front-end on the admin panel depending on the times and day he previously entered which could be stored in an array alongside the admin object. For this we need to make an update route to the admin and add two fields for an array of days and an array of times. And some fields for each admin to be able to update their arrays easily.

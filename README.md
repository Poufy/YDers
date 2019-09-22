# TODOS

- [] The admin can cancel the request with giving a reason in a textbox and confirm it, then the request will go into a log table that contains confirmed and canceled requests in different colors at the bottom of the page.

- [] Completed requests collection from requests instead of deleting.

- [] When a user form is pending on a specific time it should not appear to the other users. So we should add a pending field on the time that the user chooses until the request is done.

- [] The teacher collection might be unneccessary and could be deleted for an array that is attached to every admin's entry.

- [] Optional checkbox to choose a certain teacher from our teacher database and then show the times ONLY for that teacher

- [] Hide the form of the user is not logged in

- [x] Get the GET/POST/DELETE/UPDATE requests working on /api/teachers

- [x] Connect the api with the count of teachers to be displayed on the landing page dynamically depending on the database

- [x] Submit the GET requests using the information from the dropdown menus

- [x] Submitting the form to the database

- [x] Fix flash messages/express-validator on user signup

- [x] Put the secret and the mongo url in a seperate folder

- [x] Perform the form POST request from the front-end and send the info about the logged in user along with it

- [x] Prevent duplicate signups with the same username

- [ ] Add Multiple passport strategies (Facebook, Google)

- [x] Consider the subject/day/time in the query

- [ ] A way to automatically restart the server if it goes down incase of disconnection

- [ ] Cool looking 404 error page

- [ ] Put javascript methods in seperate files in the panel.js file

- [ ] organize the materializecss

- [x] SIGNUP/LOGIN in order to submit the form

- [x] A seperate route for admins to be able to easily make post/delete requests

- [x] Add the day in the form to the query. Right now it is assumed that every teacher is free to teach at a specific time everyday.

- [x] Better looking flash messages

- [] Secure form get request

- [x] Admin table of current avaiable times and requests available

- [x] Fix materializer error/Fail get error after admin/form submission

- [x] Better form look and polishing

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

Anyone being able to make a post request to the API and alter with the data if they knew the parameters:

    Possible Solutions:

    	- Add a parameter that contains a password/unique element(like the ID) with every post request. Checking the ID would require another query to the database to see if the Admin exists, but having a certain password is not very secure.

    	- Find a way to authenticate only some users

The admins knowning which completedForm is their own completed form.

    Possible Solution:

    	- Attach an array to every Admin document that contains the ID's of the forms that this admin completed and use that array to pull the completed forms from the database. HOWEVER, this would only work if the forms stayed in the same collection after being completed. But this is not the case. The form will be moved to the completedForm collection for more organization in the database. Therefore, the ID will most likely change when moved from one collection to another. To fix this we could find a way to move a document without giving it a new ID but make it keep the previous one. By moving here I mean making a post request with the parameters being that of the current form to another collection, then deleting it from the current database.

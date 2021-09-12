## Setup
1. Take a pull from git repo: https://github.com/DevanshiShah29/Form-builder.git
2. Execute command `npm install` to add node modules(Both for project and for backend -inside src folder)
3. Setup is now ready you can open it in any code editor.

## Run Project

### `npm start` 

Runs the app in frontend.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Runs the backend.<br />
Open [http://localhost:9000](http://localhost:9000) runs the express server.

# Libraries
1. Material UI
2. Axios
3. Express
4. node-sass
5. uuid

# Brief summary
1. This form builder's design is inspired by google forms.
2. The overall app is divided into relevent sections. i.e Routes, Components, Reducer, Images and Styles
3. `useContext` hook is used to hold the global scope of the date.
4. For styling purpose `Sass` is used.
5. To keep track and generate unique URLs `uuid` is used.
6. List page displays information about the form such as `Name` and `Date & Time`.
7. User can create forms and `add` multiple questions which also has options like `radio`, `checkboxes` and `paragraph`.
8. User can also `copy`/`delete` a particular question from the current form.
9. Once the form is created by clicking on the `save` button all the information will get passed. 
10. Once the form is saved user can start `submitting` the form by clicking on the `eye-icon`  which is displayed inside the same form.
11. Once user submits the data he will be redirected to another page. `Submit another response` will let the user fill/submit the same form again while `back` button will take user back to listing page.
12. Total number of responses are listed below the `Responses` tab inside the same form.




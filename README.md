# Intro
Here is a rough outline of I went about creating this application:

# Setting up the project:
Created a new React project using create-react-app.
Installed required packages such as Redux, Redux Thunk and any other necessary dependencies.
Enabled TypeScript in the project.

# Designing the UI:
Created a search form component that takes a query input and a submit button.
Created a results component that displays the results of the search query.
Used a CSS framework (Bootstrap) to simply style the UI.

# Setting up the store:
Created a Redux store to store the search results and any other state needed for the application.
Used Redux Thunk to handle async actions, such as making the API call to search for artists, albums, or songs.

# Making the API call:
In the search form component, created an action that dispatches a thunk action to make the API call when the form is submitted.
In the thunk action, made the API call using the axios library.
The results of the API call should be stored in the Redux store.

# Displaying the results:
Used the results stored in the Redux store to render the results in the component component.
Limited the results to 10 items at a time, and show another 10 items when the user scrolls down (and another and another).
If there are no results, I display a notification to the user.

# Testing:
Written unit tests for the different components and actions using the @testing-library/react.
Tested the API call, the store updates, and the component rendering to ensure that everything is working as expected.

# Conclusion
This is a general outline of the steps I took to create this application. It took me 2.5 hours end to end.

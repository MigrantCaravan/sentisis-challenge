# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Sentisis Frontend Challenge

Create app with React and Typescript to:

- Show a table with a list of objects (tickets/events).
  created with: `npx create-react-app sentisis-challenge  --template typescript`

from the API we receibe objects like this `[
{
"id": "1a",
"title": "Johnny Cash tribute",
"type": "show",
"releaseDate": 1555970400000,
"description": "Mauris finibus commodo malesuada. Vestibulum porttitor, massa a gravida faucibus, augue velit tristique libero, sit amet scelerisque tortor erat ut velit. Praesent orci tellus, aliquam id felis vitae, laoreet facilisis.",
"price": 15,
"currency": "euro"
},]`

## Explanation

Followed by the data fetching, the ticket is modified so we can change the quantity, and we sort them by release date. While the fetching is performed, a loading state is shown. An update quantity function was created so that when clicking the unit selector buttons, the state changes and the data is stored locally. The tickets are mapped, and the required info is displayed. Clicking a row will display a modal showing the required information. Within the modal, we can add a quantity.

**Acceptance criteria**:

        1- The table has 5 columns: name, type, release date, unit selector and price.

        2- The table is sorted by release date (most recent first).

        3- The unit selector must be a number type input. The button + (add object) must be on the left side of the selector, and the button - (remove object), on the right side.

        4- When hitting the unit selector buttons, the number of objects should get updated.

        5- When refreshing, the data are retained (the number of objects ordered is not reset).

- Show a modal window when clicking each object row.

  **Acceptance criteria**:

        1- The modal window shows the name, type and description.

        2- Besides the information, it must have an "Add" button, so that when clicking it, the modal closes and the unit selector of the list is increased in 1 unit.

- When there is at least one unit of an object, a button "Cart" must be shown under the list.

  **Acceptance criteria**:

        1- Show another modal window with the summary of the objects ordered.

        2- The summary must contain a list with the object name, number of units and total price.

        3- The list is sorted from highest to lowest unit number.

        4- The total price must be shown at the end of the list.

        5- To exit the modal, it is necessary to click outside the modal.

- Finally: Add some unit tests and e2e tests to validate the whole process.

> This is the data [endpoint](https://my-json-server.typicode.com/davidan90/demo/tickets).
>
> React and Typescript are the only mandatory libraries needed.
>
> Add a README explaining the decisions made and how to run the project.
>
> There is no specific design, feel free to style the app as you want (using css, sass or styled-c components).
>
> Return it at your convenience, we appreciate your time.

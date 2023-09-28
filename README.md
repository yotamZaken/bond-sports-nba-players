# Bond Sports NBA Players UI Home Assingment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction
This README provides an overview of the technical design and architecture of our project. 
It outlines the services and components used in the application, 
key technologies, and instructions for setting up and running the project locally.

## Project Overview
This project fetches NBA players data and renders them in a split list screen.
The left side is for all players (with pagination, in batches of 100 - the maximum number allowed per request from the API)

[Provide a brief overview of the project, its goals, and its target audience.]

## Components Breakdown
- ListContainer: a container holding both lists (side to side) and spanning across the entire page.
- PlayerList: a single component that can be used as both types of lists with conditional rendering.
- PlayerItem: a list item rendering a player's name and a favorite toggle button.
- PlayerCard: a modal component, rendering a players details when the player's item has been clicked.
- InputSearch: an input component allowing an API request for a single player data.
- Pagination: a simple component holding both pagination buttons and updates, triggering a data fetch on page change.

## Key Technologies
- React (the project is a template of Create React App with TypeScript)
- TypeScript
- Context API
- TailwindCSS

### State
- The state is managed using the `useContext` hook. A central context file is holding all the relevant state for the various components. 
I've picked that in order to save prop drilling and allow all components to access whatever pieces of data they need while also being aware to the state of other components

### Pagination
- I've implemented pagination as a part of the project's context, with a dependency on the `currentPage` state in order to trigger the next page data fetch. 

### Third Party Libraries and Packages:
- lodash
- clsx (used for conditional rendering and addition of classes).

### In order to run the project:
- Clone the GitHub repo to your machine via the link you have received by email. 
- Navigate to the cloned repo directory.
- Run: `yarn` or `npm install`.
- Run: `yarn start` or `npm start` to start the project locally.
- Open the project (if a browser window did not already open) on: [http://localhost:3000].

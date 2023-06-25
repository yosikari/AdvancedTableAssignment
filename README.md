# Advanced Table Assignment

This project is a React application that demonstrates an advanced table with various features. The live demo of the project can be found at [https://yosikari.github.io/AdvancedTableAssignment/](https://yosikari.github.io/AdvancedTableAssignment/).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contact Me](#contact-me)

## Features

- Table Pagination: The table is rendered with pagination to efficiently handle large datasets. Only one page of data is loaded at a time, reducing the amount of data rendered and improving performance.
- Column Filter: Users can hide or show specific columns in the table by using the column filter feature. Clicking the filter button opens a modal where users can choose which columns they want to display.
- Search: The table provides a search functionality that allows users to search for specific values within each column.
- Editable Data: Users can edit the data directly in the table. All variable types, including boolean, numbers, and strings, are supported.
- Data Persistence: The application saves the updated information in the local storage. Before uploading data, it attempts to retrieve the data from local storage to minimize server calls in the future.

## Technologies Used

This project is built using the following technologies:

- React
- SCSS (Sass)
- react-hot-toast
- react-icons

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   `git clone https://github.com/yosikari/AdvancedTableAssignment.git`

2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm start`

   The website should be available at [http://localhost:3000/](http://localhost:3000/).

## Contact Me

If you have any questions or feedback about the project, please feel free to reach out to me at yosikari@gmail.com.

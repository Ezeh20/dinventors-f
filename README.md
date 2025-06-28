# Country Explorer React App

# [Live Link: Country Explorer](https://dinventors.vercel.app/)

-----

## Project Description

The Country Explorer is a dynamic React application that allows users to browse a list of countries, view their details, and apply various filters and sorting options. It fetches country data from an external API and implements client-side pagination.

-----

## Features

  * **View All Countries:** Displays a list of over 250 countries.
  * **Search by Name:** Find specific countries quickly using a search bar.
  * **Filter by Region:** Narrow down results by continent (e.g., Africa, Asia, Europe).
  * **Sort Options:** Sort countries by common name (ascending/descending) or population (ascending/descending).
  * **Client-Side Pagination:** Efficiently browse through large lists of countries, displaying 12 countries per page.
  * **Pagination Controls:** Navigate between pages using "Previous" and "Next" buttons, with current page/total pages display and quick links to the next two pages.
  * **Loading States:** Provides visual feedback (skeletons) while data is being fetched.
  * **Error Handling:** Displays user-friendly messages if data fetching fails or no results are found.

-----

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-project-folder>
    ```

    (Replace `<your-repository-url>` with the actual URL of your Git repository and `<your-project-folder>` with your project's directory name.)

2.  **Install dependencies:**
    Using npm:

    ```bash
    npm install
    ```

    Or using Yarn:

    ```bash
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    Using npm:

    ```bash
    npm run dev
    ```

    Or using Yarn:

    ```bash
    yarn dev
    ```

    This will open the application in your browser at `http://localhost:3000` (or another available port).

-----

## Screenshots
<img width="1680" alt="Screenshot 2025-06-28 at 2 49 39 AM" src="https://github.com/user-attachments/assets/e859e5d9-59ad-434b-9f84-e6bd6aac8ff6" />

<img width="1680" alt="Screenshot 2025-06-28 at 2 49 48 AM" src="https://github.com/user-attachments/assets/70ee1a76-3b60-4c68-9d75-ec5352169d2f" />

-----

## Tools Used

  * **React**
  * **TypeScript**
  * **Sass/SCSS**
  * **REST Countries API** (for country data)

-----

## API

This project utilizes the [REST Countries API](https://restcountries.com/) to fetch all country data, which is then managed and paginated on the client-side.

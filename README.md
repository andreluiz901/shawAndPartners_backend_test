# CSV Upload Challenge for API

This is a project that implements an API for uploading and processing CSV files. The API allows users to upload CSV files, stores CSV data in a flexible data structure, and provides the ability to search for and retrieve data based on search terms.

## How to Use

### Clone this repository to your local development environment:

git clone REPOSITORY_URL
cd repository-name

Replace REPOSITORY_URL with the URL of your GitHub repository.

### Install dependencies

npm install

### Run the server:

npm start

###  The server will be available at http://localhost:3000.

Upload a CSV file:
Send a CSV file to the /api/files route using tools like Postman or curl.

Search data in the CSV:
Access the /api/users route and provide the q query parameter to perform a search within the CSV data.


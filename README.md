# communityhack.io

## Instructions
### Local Deployment
1. Make sure you have Node and npm (Node Package Manager) installed. Otherwise

(On MacOS with [Homebrew](https://brew.sh/) installed)
'''$ brew install node'''
and
'''$ brew install npm'''

or visit https://nodejs.org/en/download/

2. Make sure you have [PostgreSQL](https://postgresapp.com/) installed.

3. Create a PostgreSQL database called communityhack_test

To enter the PostgreSQL command line environment, do
`$ psql`

then in the psql prompt, type

``create database communityhack_test ;``

After which, quit the psql command line to return to your terminal by
`\q`

4. Initialize the backend database by
(Under the project directory)
`$ node server/models/database_init.js`

5. (In progress) Start the web app by
``$ npm start``

6. In your browser, visit http://localhost:3000/. Voila!

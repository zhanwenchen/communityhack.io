const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack';

pg.connect(connectionString, function(err, client, done) {

  client.query('DROP TABLE IF EXISTS teams, users CASCADE;',
    (err, result) => {
      console.log((err) ? `failed to drop tables\n` + err : 'successfully dropped tables');
    });

  client.query('CREATE TABLE teams(teamId SERIAL PRIMARY KEY)',
    (err, result) => {
      console.log((err) ? `failed to create teams table\n` + err : 'successfully created teams table');
  });

  client.query('CREATE TABLE users( \
                  userId SERIAL PRIMARY KEY, \
                  firstName TEXT NOT NULL, \
                  lastName TEXT NOT NULL, \
                  email TEXT NOT NULL, \
                  year INTEGER NOT NULL, \
                  teammate INTEGER REFERENCES users (userId), \
                  teamId INTEGER REFERENCES teams (teamId) \
              )',
    (err, result) => {
      console.log((err) ? `failed to create users table\n` + err : 'successfully created users table');
  });

  client.query('CREATE TABLE teamMembers( \
                  teamId INTEGER REFERENCES teams (teamId), \
                  teamMember INTEGER REFERENCES users (userId) NOT NULL \
              )',
    (err, result) => {
      console.log((err) ? `failed to create teamMembers table\n` + err : 'successfully created teamMembers table');
      client.end();
  });

});

// Zhanwen Chen
// database.js
// A script to initialize the communityhack database,
// creating tables, procedures and triggers
//
// Instructions
// 1. Make sure there is a database in the environment called "communityhack"
// 2. call this file with node
//      e.g. (under the project root directory)
//      $ node server/models/database.js

var Pool = require('pg').Pool;
var pool = new Pool({
  user: 'zhanwenchen',
  password: '',
  host: 'localhost',
  database: 'communityhack',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

pool.on('error', function(e, client) {
  // if a client is idle in the pool
  // and receives an error - for example when your PostgreSQL server restarts
  // the pool will catch the error & let you handle it here
});


// pool.query('DROP TABLE IF EXISTS teams, users CASCADE;',
//   function(err, result) {
//     console.log((err) ? `error in dropping tables\n` + err : 'successfully dropped tables');
//     // if (result) console.log('result of dropping tables', result);
// });
//
// pool.query('CREATE TABLE teams(teamId SERIAL PRIMARY KEY)',
//   function(err, result) {
//     console.log((err) ? `failed to create teams tables\n` + err : 'successfully created teams table');
// });
//
// pool.query('CREATE TABLE users( \
//               userId SERIAL PRIMARY KEY, \
//               firstName TEXT NOT NULL, \
//               lastName TEXT NOT NULL, \
//               email TEXT NOT NULL, \
//               year INTEGER NOT NULL, \
//               teammate INTEGER REFERENCES users (userId), \
//               teamId INTEGER REFERENCES teams (teamId) \
//             )',
//             function(err) {
//               console.log((err) ? `failed to create users table\n` + err : 'successfully created users table');
// });

pool.query('DROP TABLE IF EXISTS teams, users CASCADE;',
  function(err, result) {
    console.log((err) ? `error in dropping tables\n` + err : 'successfully dropped tables');
    // if (result) console.log('result of dropping tables', result);
});

pool.query('CREATE TABLE teams(teamId SERIAL PRIMARY KEY)',
  function(err, result) {
    console.log((err) ? `failed to create teams tables\n` + err : 'successfully created teams table');
});

pool.query('CREATE TABLE users( \
              userId SERIAL PRIMARY KEY, \
              firstName TEXT NOT NULL, \
              lastName TEXT NOT NULL, \
              email TEXT NOT NULL, \
              year INTEGER NOT NULL, \
              teammate INTEGER REFERENCES users (userId), \
              teamId INTEGER REFERENCES teams (teamId) \
            )',
            function(err) {
              console.log((err) ? `failed to create users table\n` + err : 'successfully created users table');
});

// var create_teams_query = client.query(
//   'CREATE TABLE teams( \
//     teamId SERIAL PRIMARY KEY \
//   )'
// );
// create_teams_query.on('end', function() {
//       console.log('create_teams_query ended');
// });
//
// var create_teamMembers_query = client.query(
//   'CREATE TABLE teamMembers( \
//     teamId INTEGER REFERENCES teams (teamId), \
//     teamMember INTEGER REFERENCES users (userId) NOT NULL \
//   )'
// );
// // query.on('end', () => { client.end(); });
// create_teamMembers_query.on('end', function() {
//       console.log('create_teamMembers_query ended');
// });
// // 5. Create a trigger to update users and teams
// // whenever "users" is modified
// // Behaviors triggered
// // Case 1: ON "INSERT"
// //         1. if no teammate preference:
// //              (1). create a new team in 'teams',
// //              (2). add the user in 'teamMembers', and
// //              (3). assign user to the new team in 'users'
// //         2. if there is teammate preference:
// //              (1). check if teammate exists
// //                  a. yes -
// //                          i. check if team is already filled
// //                              - 1. yes
// //                                      (1) add the user in 'teamMembers'
// //                                      (2) assign user to the new team in 'users'
// //                              - 2. no - raise nonexistent teammate error
// //                  b. no - raise nonexistent teammate error
// // Case 2: ON "DELETE"
// //         1. DELETE from 'teamMembers'
// //         2. if teamMembers no longer has a record, delete the record from 'teams'
// var create_func_query = client.query(
//   'CREATE OR REPLACE FUNCTION update_wrt_registration_func() RETURNS TRIGGER AS $$ \
//   BEGIN \
//       IF (TG_OP = \'INSERT\') THEN \
//         IF (NEW.teammate) IS NULL THEN \
//           INSERT INTO teams RETURNING teamId AS newTeam; \
//           INSERT INTO teamMembers (teamId, teamMember) VALUES (newTeam, NEW.userId); \
//           NEW.teamId := newTeam; \
//         ELSE \
//           IF NOT EXISTS (SELECT teamId AS oldTeam FROM users WHERE users.userId = NEW.teammate) THEN \
//             RAISE EXCEPTION \'Nonexistent Teammate ID --> %\', teammate USING HINT = \'Please check your teammate ID\'; \
//           ENDIF; \
//           IF (SELECT COUNT(teamMember) FROM teamMembers WHERE teamId = oldTeam) = 4 \
//             RAISE EXCEPTION \'Full Team --> %\', oldTeam USING HINT = \'Please choose another team or leave it blank to create a new team\'; \
//           ENDIF; \
//           INSERT into teamMembers (teamId, teamMember) VALUES (oldTeam, NEW.userId); \
//           NEW.teamId := oldTeam; \
//         ENDIF; \
//         RETURN NEW; \
//       ELSIF (TG_OP = \'DELETE\') THEN \
//         DELETE FROM teamMembers WHERE teamMembers.teamMember = OLD.userId RETURNING teamId AS teamIdToDelete; \
//         DELETE FROM teams WHERE teams.teamId = teamIdToDelete; \
//         RETURN OLD; \
//       END IF; \
//       RETURN NULL; \
//   END; \
//   $$ LANGUAGE plpgsql;');
//
// create_func_query.on('end', function() {
//       console.log('create_func_query ended');
// });
//
// var create_trig1_query = client.query(
//   'CREATE TRIGGER update_wrt_registration_insert AFTER INSERT \
//     ON users \
//     FOR EACH ROW \
//     EXECUTE PROCEDURE update_wrt_registration_func();'
// );
// create_trig1_query.on('end', function() {
//       console.log('create_trig1_query ended');
// });
//
// // -- Create separate triggers for BEFORE INSERT and AFTER DELETE in player_names
// // -- due to foreign key constraints in player_scores
//
// var create_trig2_query = client.query(
//   'CREATE TRIGGER update_wrt_registration_delete BEFORE DELETE \
//     ON users \
//     FOR EACH ROW \
//     EXECUTE PROCEDURE update_wrt_registration_func();'
// );
// create_trig2_query.on('end', function() {
//       console.log('create_trig2_query ended');
// });


// client.on('drain', client.end.bind(client));

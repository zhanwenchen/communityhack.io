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

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack';

const client = new pg.Client(connectionString);
client.connect(function (err) {
  if (err) throw err;

  // users provide a teammate
  client.query(
    'CREATE TABLE users( \
      userId SERIAL PRIMARY KEY, \
      firstName STRING NOT NULL, \
      lastName STRING NOT NULL, \
      email STRING NOT NULL, \
      year INTEGER NOT NULL, \
      teammate INTEGER REFERENCES users (userId), \
      teamId INTEGER REFERENCES teams (teamId) \
    )'
  );

  client.query(
    'CREATE TABLE teams( \
      teamId SERIAL PRIMARY KEY, \
      teamMember1 INTEGER REFERENCES users (userId) NOT NULL, \
      teamMember2 INTEGER REFERENCES users (userId) DEFAULT NULL, \
      teamMember3 INTEGER REFERENCES users (userId) DEFAULT NULL, \
      teamMember4 INTEGER REFERENCES users (userId) DEFAULT NULL \
    )'
  );

  // client.query(
  //   'CREATE TABLE teams( \
  //     teamId SERIAL PRIMARY KEY \
  //   )'
  // );

  // client.query(
  //   'CREATE TABLE teamMembers( \
  //     teamId INTEGER REFERENCES teams (teamId), \
  //     teamMember INTEGER REFERENCES users (userId) NOT NULL \
  //   )'
  // );

  // 5. Create a trigger to update users and teams
  // whenever "users" is modified
  // Behaviors triggered
  // Case 1: ON "INSERT"
  //         1. if no teammate preference, create an single-member team
  //         2. if there is teammate preference, assign to that team
  // Case 2: ON "DELETE"
  //         1. Delete the row with the same id
  client.query(
    'CREATE OR REPLACE FUNCTION update_users_wrt_registration_func() RETURNS TRIGGER AS $$ \
    BEGIN \
        IF (TG_OP = 'INSERT') THEN \
            IF (NEW.teammate) IS NULL THEN \
              INSERT INTO teams (teamMember1) VALUES () RETURNING teamId AS newTeam; \
              NEW.teamId := newTeam; \

            ELSEIF EXISTS (SELECT teamId FROM users WHERE users.userId = NEW.teammate) THEN \
              INSERT into teams (teamMember)\
            ENDIF; \
            \
            INSERT INTO player_scores \
                (id) \
            VALUES \
                (NEW.id); \
            RETURN NEW; \
        ELSIF (TG_OP = 'DELETE') THEN \

            DELETE FROM player_scores \
            WHERE player_scores.id = OLD.id; \

            RETURN OLD; \

        END IF; \
        RETURN NULL; \
    END; \
    $$ LANGUAGE plpgsql;'
  );

  // -- Create separate triggers for BEFORE INSERT and AFTER DELETE in player_names
  // -- due to foreign key constraints in player_scores
  // CREATE TRIGGER update_teams_wrt_registration_insert AFTER INSERT
  //   ON player_names
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE update_scores_wrt_registration_func();
  //
  // CREATE TRIGGER update_teams_wrt_registration_delete BEFORE DELETE
  //   ON player_names
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE update_scores_wrt_registration_func();
});



// query.on('end', () => { client.end(); });
client.on('drain', client.end.bind(client));

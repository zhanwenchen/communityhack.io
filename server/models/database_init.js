const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack_test';

pg.connect(connectionString, function(err, client, done) {

  client.query('DROP TABLE IF EXISTS teams, users, teamMembers, logins CASCADE;',
    (err, result) => {
      console.log((err) ? `failed to drop 4 tables\n` + err : 'successfully dropped 4 tables');
    });

  client.query('CREATE TABLE teams(teamId SERIAL PRIMARY KEY);',
    (err, result) => {
      console.log((err) ? `failed to create teams table\n` + err : 'successfully created teams table');
  });

  client.query('CREATE TABLE users( \
                  userId SERIAL PRIMARY KEY, \
                  firstName TEXT NOT NULL, \
                  lastName TEXT NOT NULL, \
                  email TEXT UNIQUE NOT NULL, \
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
  });

  client.query('CREATE TABLE logins( \
                  userId INTEGER REFERENCES users (userId), \
                  passwordHash TEXT NOT NULL \
              )',
    (err, result) => {
      console.log((err) ? `failed to create logins table\n` + err : 'successfully created logins table');
  });

  client.query('DROP FUNCTION IF EXISTS update_wrt_registration_func() CASCADE;',
    (err, result) => {
      console.log((err) ? `failed to drop function\n` + err : 'successfully dropped function');
    });

  client.query('CREATE OR REPLACE FUNCTION update_wrt_registration_func() RETURNS TRIGGER AS $$ \
                DECLARE \
                  newTeamId INTEGER; \
                BEGIN \
                    IF (TG_OP = \'INSERT\') THEN \
                      IF (NEW.teammate) IS NULL THEN \
                        INSERT INTO teams (teamId) VALUES (DEFAULT) RETURNING teamId AS newTeamId; \
                        INSERT INTO teamMembers (teamId, teamMember) VALUES (newTeamId, NEW.userId); \
                        NEW.teamId := newTeamId; \
                      ELSE \
                        IF NOT EXISTS (SELECT teamId AS oldTeam FROM users WHERE users.userId = NEW.teammate) THEN \
                          RAISE EXCEPTION \'Nonexistent Teammate ID --> %\', teammate USING HINT = \'Please check your teammate ID\'; \
                        END IF; \
                        IF (SELECT COUNT(teamMember) FROM teamMembers WHERE teamId = oldTeam) = 4 THEN \
                          RAISE EXCEPTION \'Full Team --> %\', oldTeam USING HINT = \'Please choose another team or leave it blank to create a new team\'; \
                        END IF; \
                        INSERT into teamMembers (teamId, teamMember) VALUES (oldTeam, NEW.userId); \
                        NEW.teamId := oldTeam; \
                      END IF; \
                      RETURN NEW; \
                    ELSIF (TG_OP = \'DELETE\') THEN \
                      DELETE FROM teamMembers WHERE teamMembers.teamMember = OLD.userId RETURNING oldTeamId; \
                      DELETE FROM teams WHERE teams.teamId = oldTeamId; \
                      RETURN OLD; \
                    END IF; \
                    RETURN NULL; \
                END; \
                $$ LANGUAGE plpgsql;',
    (err, result) => {
      console.log((err) ? `failed to create function\n` + err : 'successfully created function');
  });

  client.query('DROP TRIGGER IF EXISTS update_wrt_registration_insert ON users CASCADE; \
                DROP TRIGGER IF EXISTS update_wrt_registration_delete ON users CASCADE;',
    (err, result) => {
      console.log((err) ? `failed to drop triggers\n` + err : 'successfully dropped triggers');
    });

  client.query('CREATE TRIGGER update_wrt_registration_insert AFTER INSERT \
                  ON users \
                  FOR EACH ROW \
                  EXECUTE PROCEDURE update_wrt_registration_func(); \
                CREATE TRIGGER update_wrt_registration_delete BEFORE DELETE \
                  ON users \
                  FOR EACH ROW \
                  EXECUTE PROCEDURE update_wrt_registration_func();',
    (err, result) => {
      console.log((err) ? `failed to create triggers\n` + err : 'successfully created triggers');
      client.end();
  });

});

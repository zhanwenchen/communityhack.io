var chai = require('chai');
var should = chai.should();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack_test';

// pgtest.expect(
//   'INSERT INTO users \
//     (firstName, lastName, email, year, teammate) \
//   VALUES \
//     ($1, $2, $3, $4, $5);',
//   ["Zhanwen", "Chen", "zhchen@vassar.edu", 2016, null]
// ).returning(null, []);
//
// pgtest.expect(
//   'SELECT firstName, lastName, email, year, teammate FROM users;')
//   .returning(null, [
//     ["Zhanwen", "Chen", "zhchen@vassar.edu", 2016, null]
//   ]);


describe('Database:users', function() {
  it('should insert a new user on INSERT', (done) => {
    done();
  });
  it('should delete an existing user on DELETE');
  it('should create a new team on creating a new user without teammate');
  it('should delete a team if no user is pointed to it');
});

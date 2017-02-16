// NOTE: MUST NOT HAVE PG TAKE done as a param because chai uses it!

process.env.NODE_ENV = 'test';
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack_test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
const pg = require('pg');

var should = chai.should();
chai.use(chaiHttp);

describe('API:users', function() {

  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('DELETE FROM "users";', (err) => {
      done();
    });
  });

  beforeEach((done) => {
    pg.connect(connectionString, (err, client) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Insert Data
      client.query(
        'INSERT INTO users ("firstName", "lastName", "email", "year") \
        VALUES ($1, $2, $3, $4);', ["Zhanwen", "Chen", "zhchen@vassar.edu", 2016]
        , (err) => { done(); });
    });
  });

  afterEach((done) => {
    pg.connect(connectionString, (err, client) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      client.query('DELETE FROM "users" ;', (err) => { done(); });
    });
  });

  it('should list ALL users on /api/v1/users GET', function(done) {
  chai.request(server)
    .get('/api/v1/users')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      // console.log("res.body[0] is %j", res.body[0]);
      res.body[0].should.have.property('firstName');
      res.body[0].should.have.property('lastName');
      res.body[0].firstName.should.equal('Zhanwen');
      res.body[0].lastName.should.equal('Chen');
      done();
    });
  });

  it('should list a SINGLE user on /api/v1/user/:userId GET', function(done) {
    pg.connect(connectionString, (err, client) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Insert Data
      client.query(
        'INSERT INTO users \
          ("firstName", "lastName", "email", "year") \
        VALUES \
          ($1, $2, $3, $4) \
        RETURNING "userId";'
        , ["Ada", "Lovelace", "adlovelace@vassar.edu", 1877]
        , function(err, result) {
          // console.log("result is %j", result);
          // console.log("result.rows is %j", result.rows[0].userId);
          newUserId = result.rows[0].userId;
          chai.request(server)
            .get('/api/v1/user/'+newUserId)
            .end(function(err, res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.firstName.should.equal('Ada');
              res.body.lastName.should.equal('Lovelace');
              done();
            });
      });
    });
  });

  it('should update a SINGLE user on /api/v1/user/:userId PUT');
  it('should delete a SINGLE user on /api/v1/user/:userId DELETE');
});

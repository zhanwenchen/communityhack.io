const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/communityhack_test';

router.get('/', (req, res, next) => {
  console.log("./ = %s", path.resolve("./"));
  console.log("__dirname = %s", path.resolve(__dirname));
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

// Get a single user
router.get('/api/v1/user/:userId', (req, res, next) => {
  const results = [];
  const id = req.params.userId;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query(
      'SELECT "firstName", "lastName", "email", "year" FROM "users" \
      WHERE "userId" = ($1);', [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results[0]);
    });
  });
});


router.get('/api/v1/users', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query(
      'SELECT "firstName", "lastName", "email", "year" FROM "users" \
      ORDER BY "lastName" ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      // console.log(row);
      results.push(row);
      // console.log("results is %j", results)
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// Create a new user by submitting a POST form
router.post('/api/v1/users', (req, res, next) => {
  // const results = [];
  // Grab data from http request
  const data = {firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                year: req.body.year
                }
  // console.log("data: %j", data);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query(
      'INSERT INTO "users" \
        ("firstName", "lastName", "email", "year") \
      VALUES \
        ($1, $2, $3, $4);',
      [data.firstName, data.lastName, data.email, data.year]
    , (err) => {
      if (err) {
        console.log(err)
      } else {
        return res.json({SUCCESS: data});
      }
    });
    // // Then get the updated results
    // const query = client.query('SELECT * FROM users ORDER BY lastName ASC;');
    // // Stream results back one row at a time
    // query.on('row', (row) => {
    //   results.push(row);
    // });
    // // After all data is returned, close connection and return results
    // query.on('end', () => {
    //   done();
    //   return res.json(results);
    // });
  });
});

// Update an existing user
router.put('/api/v1/user/:userId', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.userId;
  // Grab data from http request
  const data = {firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                year: req.body.year,
                teammate: req.body.teammate
                }
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query(
      'UPDATE "users" SET \
        "firstName" = ($1), \
        "lastName" = ($2),  \
        "email" = ($3), \
        "year" = ($4), \
        "teammate" = ($5) \
      WHERE "userId" = ($6) \
      ;',
      [data.firstName, data.lastName, data.email, data.year, data.teammate, id]
    );
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM "users" ORDER BY "lastName" ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/user/:userId', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.userId;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM "users" WHERE "userId"=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT "firstName", "lastName", "email", "year" FROM "users" ORDER BY "lastName" ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;

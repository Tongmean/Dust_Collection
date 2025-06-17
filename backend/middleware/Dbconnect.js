const { Pool } = require('pg');

// Create a new pool with connection details
const dbconnect = new Pool({
  // Default PostgreSQL port
  //dpg-d052837gi27c73c8frdg-a
  // user: 'dust_collection_1_user',
  // host: 'dpg-d052837gi27c73c8frdg-a.singapore-postgres.render.com',
  // database: 'dust_collection_1',
  // password: 'JiVPSOF4KqdJtDcUHIbicOnIqw0r5W5M',
  // port: 5432,
  // ssl: {
  //   rejectUnauthorized: false, // Use this for Render-hosted databases
  // }
  user: 'postgres',       // Your PostgreSQL username
  host: 'localhost',            // Database host (e.g., localhost)
  database: 'Dust_Collection',    // Your PostgreSQL database name
  password: '15tongmean',    // Your PostgreSQL password
  port: 5432,                   // Default PostgreSQL port


});
dbconnect.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connection to PostgreSQL successful!');
    release();  // Release the client back to the pool
  }
});


module.exports = dbconnect;
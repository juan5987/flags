const { Pool, Client } = require('pg');
const connectionString = process.env.PG_URL;

const client = new Client({
  connectionString,
});

client.connect();

module.exports = client;

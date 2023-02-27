const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/wombatdev');

module.exports = client;

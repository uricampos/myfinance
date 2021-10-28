const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    password: 'password',
    host: 'host',
    port: 'port',
    database: 'database'
})

module.exports = pool;
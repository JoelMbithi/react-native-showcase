import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'joe',
  host: 'localhost',
  database: 'E-Commerce',
  password: '@jhoelloh9045',
  port: 5432,
});

export default pool;

require('dotenv').config();
const db = require('./config/db');

(async () => {
  const [rows] = await db.query('SELECT 1 AS ok');
  console.log(rows);
  process.exit(0);
})();

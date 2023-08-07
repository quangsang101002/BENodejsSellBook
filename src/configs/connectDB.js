import mysql from 'mysql';

console.log('Kết nối mysql thành công ...<..>');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'rikkei_academy',
});
export default pool;

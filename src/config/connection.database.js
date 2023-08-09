import mysql from 'mysql';
console.log('Đang kết nối với db...');

const getConnection = () => {
  return mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'rikkei_academy',
  });
};
export default getConnection;

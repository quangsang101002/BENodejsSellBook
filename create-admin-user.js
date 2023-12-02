import getConnection from './src/config/connection.database.js';
import { encryptPassWord } from './src/utilities/hash.util.js';

const connection = getConnection();

const adminUser = {
  username: 'sang123',
  email: 'quangsang123@gmail.com',
  password: encryptPassWord('password123'),
  role: 1,
  create_at: '2022-12-12 12:12:12',
  create_by: 0,
  update_at: '2022-12-12 12:12:12',
  update_by: 0,
};
connection.query('INSERT INTO users SET ?', adminUser, (error, result) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Successed');
  }
});
connection.end();

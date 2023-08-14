import bcrypt, { hash } from 'bcrypt';
import { SALT_ROUNDS } from '../config/hash.config.js';
const encryptPassWord = (value) => {
  return bcrypt.hashSync(value, SALT_ROUNDS);
};
const comparePassWord = (value, encrypteValue) => {
  return bcrypt.compareSync(value, encrypteValue);
};
export { encryptPassWord, comparePassWord };

import getConnection from '../../config/connection.database.js';
import moment from 'moment/moment.js';
const currentTime = moment();

const searchOrder = (params, callback) => {
  const connection = getConnection();
  let sql = ' FROM orders';
  const bindParams = [];
  const page = params.page || 1;
  const limit = params.limit || 2;
  const offset = (page - 1) * limit;

  if (params.name) {
    const name = '%' + params.name + '%';
    sql += ' WHERE note LIKE ?';
    bindParams.push(name);
  }
  // SELECT order_id, serial_number, user_id,order_at, total_price, status, note, created_at, updated_at
  connection.query(
    'SELECT COUNT(1) AS totalOrders' + sql,
    bindParams,
    (error, countResult) => {
      if (error) {
        callback(error, null);
      } else if (countResult[0].totalOrders !== 0) {
        const selectColumnsQuery =
          'SELECT *' + sql + ` LIMIT ${limit} OFFSET ${offset}`;

        connection.query(selectColumnsQuery, bindParams, (error, result) => {
          if (error) {
            callback(null, error);
          } else {
            callback(null, {
              totalOrders: countResult[0].totalOrders,
              recount: result,
            });
          }
        });
        connection.end();
      } else {
        callback(null, {
          totalOrders: 0,
          recount: [],
        });
        connection.end();
      }
    },
  );
};
const addOrder = (bodyOrder, callback) => {
  const connection = getConnection();
  const productToCreate = {
    ...bodyOrder,
    created_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
    updated_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
    order_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
  };
  const sqlAddProduct = 'INSERT INTO orders SET ?';

  connection.query(sqlAddProduct, productToCreate, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const getDetailOrder = (req, res) => {};
const deleteOrder = (req, res) => {};
const updateOrder = (req, res) => {};
export default {
  addOrder,
  searchOrder,
  getDetailOrder,
  deleteOrder,
  updateOrder,
};

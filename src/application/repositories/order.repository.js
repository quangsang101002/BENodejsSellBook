import getConnection from '../../config/connection.database.js';
import moment from 'moment/moment.js';
const currentTime = moment();

const searchOrder = (params, callback) => {
  const connection = getConnection();
  let sql =
    'SELECT users.username, orders.* FROM rikkei_academy.orders LEFT JOIN users ON orders.user_id = users.id';
  const bindParams = [];
  const page = params.page || 1;
  const limit = params.limit || 5;
  const offset = (page - 1) * limit;

  if (params.name) {
    const name = '%' + params.name + '%';
    sql += ' WHERE username LIKE ?';
    bindParams.push(name);
  }

  connection.query(
    'SELECT COUNT(1) AS totalOrders FROM orders',
    (error, countResult) => {
      if (error) {
        callback(error, null);
      } else if (countResult[0].totalOrders !== 0) {
        const selectColumnsQuery = sql + ` LIMIT ${limit} OFFSET ${offset}`;

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
  console.log('bodyOrder-----', bodyOrder);
  const connection = getConnection();
  const productToCreate = {
    ...bodyOrder,
    serial_number: new Date().getTime(),
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
  connection.end();
};

const getDetailOrder = (req, res) => {};
const deleteOrder = (id, callback) => {
  const connection = getConnection();

  const sqlDelete = 'DELETE FROM orders WHERE order_id = ?';
  connection.query(sqlDelete, [id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
  connection.end();
};
const updateOrder = (params, callback) => {
  const bodyStatus = params.bodyOrder.status;
  const id = params.idOrder.id;
  const idUpdate = params.authId;
  const connection = getConnection();
  const timeUpdate = currentTime.format('YYYY-MM-DD HH:mm:ss');
  const sqlUpdate =
    'UPDATE orders SET status = ?, updated_at = ?, updated_by_id= ? WHERE order_id = ?';
  connection.query(
    sqlUpdate,
    [Number(bodyStatus), timeUpdate, idUpdate, Number(id)],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
  connection.end();
};
export default {
  addOrder,
  searchOrder,
  getDetailOrder,
  deleteOrder,
  updateOrder,
};

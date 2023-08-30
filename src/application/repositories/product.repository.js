import getConnection from '../../config/connection.database.js';
import moment from 'moment/moment.js';
const currentTime = moment();

const searchProduct = (params, callback) => {
  const connection = getConnection();
  const currentTime = moment(); // Bạn có thể thêm các tùy chọn cho đối tượng moment() tại đây

  let sql = ' FROM products';
  const bindParams = [];

  if (params.name) {
    const name = '%' + params.name + '%';
    sql += ' WHERE name LIKE ?';
    bindParams.push(name);
  }

  connection.query(
    'SELECT COUNT(1) AS totalProduct' + sql,
    bindParams,
    (error, countResult) => {
      if (error) {
        connection.end();
        callback(error, null);
      } else if (countResult[0].totalProduct !== 0) {
        let selectColumnsQuery =
          'SELECT product_id, sku, name, category, description, unit_price, image, created_at, created_by_id, updated_at, updated_by_id' +
          sql;

        if (params.limit && params.page) {
          const page = params.page || 1;
          const limit = params.limit || 7;
          const offset = (page - 1) * limit;
          selectColumnsQuery += ` LIMIT ${limit} OFFSET ${offset}`;
        }

        connection.query(selectColumnsQuery, bindParams, (error, result) => {
          connection.end();
          if (error) {
            callback(error, null);
          } else {
            callback(null, {
              totalProduct: countResult[0].totalProduct,
              recount: result,
            });
          }
        });
      } else {
        connection.end();
        callback(null, {
          totalProduct: 0,
          recount: [],
        });
      }
    },
  );
};

const addProduct = (product, callback) => {
  const connection = getConnection();
  const productToCreate = {
    ...product,
    created_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
    updated_at: currentTime.format('YYYY-MM-DD HH:mm:ss'),
  };
  const sqlAddProduct = 'INSERT INTO products SET ?';

  connection.query(sqlAddProduct, [productToCreate], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const getDetailProduct = (params, callback) => {
  const connection = getConnection();
  const sqlDetail = 'SELECT * FROM products WHERE product_id = ?';
  connection.query(sqlDetail, [params.id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const deleteProduct = (params, callback) => {
  const connection = getConnection();
  const idProduct = params.id;
  const sqlDelete = 'DELETE FROM products WHERE product_id = ?';
  connection.query(sqlDelete, [idProduct], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const updateProduct = (params, callback) => {
  const { sku, name, category, description, unit_price } = params;
  const id = params.productId.id;
  const idUpdate = params.authId;
  const connection = getConnection();
  const timeUpdate = currentTime.format('YYYY-MM-DD HH:mm:ss');
  const sqlUpdate =
    'UPDATE products SET sku = ?, name = ?, category = ?, description = ?, unit_price = ?, updated_at= ?, updated_by_id = ? WHERE product_id = ?';
  connection.query(
    sqlUpdate,
    [sku, name, category, description, unit_price, timeUpdate, idUpdate, id],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
};
const getProductBySkuAndName = (sku, nameProduct, callback) => {
  const querySku = 'SELECT * FROM products WHERE sku = ?';
  const queryNameProduct = 'SELECT * FROM products WHERE name = ?';
  const connection = getConnection();

  // Thực hiện lệnh SQL để tìm sản phẩm theo sku
  connection.query(querySku, [sku], (errorSku, resultsSku) => {
    if (errorSku) {
      callback(errorSku, null);
    } else {
      // Thực hiện lệnh SQL để tìm sản phẩm theo nameProduct
      connection.query(
        queryNameProduct,
        [nameProduct],
        (errorName, resultsName) => {
          if (errorName) {
            callback(errorName, null);
          } else {
            const result = {
              bySku: resultsSku[0] || null,
              byNameProduct: resultsName[0] || null,
            };
            callback(null, result);
          }
        },
      );
    }
  });
};

export default {
  searchProduct,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  getProductBySkuAndName,
};

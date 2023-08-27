import orderRepository from '../repositories/order.repository.js';
const searchOrder = (params, callback) => {
  orderRepository.searchOrder(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const addOrder = (requestBody, callback) => {
  let originalname = null;
  let path = null;

  if (requestBody.avatar) {
    originalname = requestBody.avatar.originalname;
    path = requestBody.avatar.path;
  }

  const validate = (params) => {
    let errors = new Map();
    // serial_number nameproduct
    if (!params.serial_number) {
      errors.set('serial_numberProduct', 'mã đơn hàng không được bỏ trống.');
    } else if (typeof params.serial_number !== 'string') {
      errors.set('serial_numberProduct', 'mã đơn hàng phải là chuỗi.');
    } else if (
      params.serial_number.length <= 4 ||
      params.serial_number.length > 100
    ) {
      errors.set('nameProduct', 'mã đơn hàng chỉ cho phép 4 đến 10 ký tự.');
    }

    // Validate status trang thái
    if (!params.status) {
      errors.set('status', 'trang thái không được bỏ trống.');
    } else if (typeof params.status !== 'string') {
      errors.set('status', 'trang thái phải là chuỗi.');
    } else if (params.status.length <= 0 || params.status.length > 50) {
      errors.set('status', 'status chỉ cho phép 4 đến 50 ký tự.');
    }

    // Validate note
    if (typeof params.note !== 'string') {
      errors.set('note', 'miêu tả phải là chuỗi.');
    } else if (params.note && params.note.length > 50) {
      errors.set('note', 'miêu tả chỉ cho phép dưới 50 ký tự.');
    }

    return errors;
  };

  const validateErrors = validate(requestBody);

  if (validateErrors.size !== 0) {
    callback(Object.fromEntries(validateErrors), null);
  } else {
    let avatar = null;
    if (requestBody.avatar) {
      const avatarExtension = getFilleExtention(originalname);
      avatar = `avatar/${requestBody.name}.${avatarExtension}`;
      const avatarLocation = './public/' + avatar;
      // Copy upload file to saving location
      fs.cpSync(path, avatarLocation);
    }

    const newUser = {
      serial_number: requestBody.serial_number,
      user_id: requestBody.user_id,
      total_price: requestBody.total_price,
      status: Number(requestBody.status),
      note: requestBody.note,
      created_by_id: requestBody.authId,
      updated_by_id: requestBody.authId,
    };

    orderRepository.addOrder(newUser, (error, result) => {
      if (path) {
        fs.rmSync(path);
      }
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};
const getDetailOrder = (req, res) => {};
const deleteOrder = (idOrder, callback) => {
  orderRepository.deleteOrder(idOrder, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
const updateOrder = (params, callback) => {
  orderRepository.updateOrder(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
export default {
  addOrder,
  searchOrder,
  getDetailOrder,
  deleteOrder,
  updateOrder,
};

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

// const addProduct = (requestBody, callback) => {
//   let originalname = null;
//   let path = null;
//   if (requestBody.PhotosProduct) {
//     requestBody.PhotosProduct.map((img) => {
//       originalname = img.originalname;
//       path = img.path;
//     });
//   }
//   const validate = (params) => {
//     let errors = new Map();
//     // Validate nameproduct
//     if (!params.name) {
//       errors.set('nameProduct', 'Tên sản phẩm không được bỏ trống.');
//     } else if (typeof params.name !== 'string') {
//       errors.set('nameProduct', 'Tên sản phẩm phải là chuỗi.');
//     } else if (params.name.length < 5 || params.name.length > 100) {
//       errors.set('nameProduct', 'Tên sản phẩm chỉ cho phép 4 đến 10 ký tự.');
//     }
//     // Validate sku mã sản phẩm
//     if (!params.sku) {
//       errors.set('sku', 'mã sản phẩm không được bỏ trống.');
//     } else if (typeof params.sku !== 'string') {
//       errors.set('sku', 'mã sản phẩm phải là chuỗi.');
//     } else if (params.sku.length < 4 || params.sku.length > 50) {
//       errors.set('sku', 'sku chỉ cho phép 4 đến 50 ký tự.');
//     }
//     // Validate description
//     if (typeof params.description !== 'string') {
//       errors.set('description', 'miêu tả phải là chuỗi.');
//     } else if (params.description && params.description.length > 50) {
//       errors.set('description', 'miêu tả chỉ cho phép dưới 50 ký tự.');
//     }
//     // Validate unit_price
//     if (typeof params.unit_price !== 'string') {
//       errors.set('unit_price', ' Giá Tên phải là chuỗi.');
//     } else if (params.first_name && params.unit_price.length > 50) {
//       errors.set('unit_price', ' Giá Tên chỉ cho phép dưới 50 ký tự.');
//     }
//     return errors;
//   };
//   const validateErrors = validate(requestBody);
//   if (validateErrors.size !== 0) {
//     callback(Object.fromEntries(validateErrors), null);
//   } else {
//     // Tạo một mảng để chứa các đường dẫn ảnh
//     let photosArray = [];

//     if (requestBody.PhotosProduct) {
//       requestBody.PhotosProduct.forEach((img, index) => {
//         const photosExtension = getFilleExtention(img.originalname);
//         const photos = `photos/${index}-${requestBody.name}.${photosExtension}`;
//         const photosLocation = './public/' + photos;
//         // Copy upload file to saving location
//         fs.copyFileSync(img.path, photosLocation);
//         // Thêm đường dẫn ảnh vào mảng
//         photosArray.push(photos);
//       });
//     }

//     const newUser = {
//       name: requestBody.name,
//       sku: requestBody.sku,
//       category: requestBody.category,
//       description: requestBody.description,
//       unit_price: requestBody.unit_price,
//       image: photosArray.join(','), // Chuyển mảng thành chuỗi, các đường dẫn cách nhau bằng dấu ","
//       created_by_id: requestBody.authId,
//       updated_by_id: requestBody.authId,
//     };

//     productRepository.addProduct(newUser, (error, result) => {
//       if (path) {
//         fs.rmSync(path);
//       }
//       if (error) {
//         callback(error, null);
//       } else {
//         callback(null, result);
//       }
//     });
//   }
// };

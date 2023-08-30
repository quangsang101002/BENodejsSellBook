import productRepository from '../repositories/product.repository.js';
import { getFilleExtention } from '../../utilities/uploadUtil.js';
import fs from 'fs';

const searchProduct = (params, callback) => {
  productRepository.searchProduct(params, callback, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const addProduct = (requestBody, callback) => {
  let originalnameAvatar = null;
  let pathAvatar = null;
  let originalnameGallery = null;
  let pathGallery = null;

  if (requestBody.avatar) {
    requestBody.avatar.map((img) => {
      originalnameAvatar = img.originalname;
      pathAvatar = img.path;
    });
  }
  if (requestBody.gallery) {
    requestBody.gallery.map((img) => {
      originalnameGallery = img.originalname;
      pathGallery = img.path;
    });
  }

  const validate = (params) => {
    let errors = new Map();
    if (!params.name) {
      errors.set('nameProduct', 'Tên sản phẩm không được bỏ trống.');
    } else if (typeof params.name !== 'string') {
      errors.set('nameProduct', 'Tên sản phẩm phải là chuỗi.');
    } else if (params.name.length < 5 || params.name.length > 100) {
      errors.set('nameProduct', 'Tên sản phẩm chỉ cho phép 4 đến 10 ký tự.');
    }
    if (!params.sku) {
      errors.set('sku', 'Mã sản phẩm không được bỏ trống.');
    } else if (typeof params.sku !== 'string') {
      errors.set('sku', 'Mã sản phẩm phải là chuỗi.');
    } else if (params.sku.length < 4 || params.sku.length > 50) {
      errors.set('sku', 'Mã sản phẩm chỉ cho phép 4 đến 50 ký tự.');
    }
    if (typeof params.description !== 'string') {
      errors.set('description', 'Miêu tả phải là chuỗi.');
    } else if (params.description && params.description.length > 50) {
      errors.set('description', 'Miêu tả chỉ cho phép dưới 50 ký tự.');
    }
    if (typeof params.unit_price !== 'string') {
      errors.set('unit_price', 'Giá Tên phải là chuỗi.');
    } else if (params.first_name && params.unit_price.length > 50) {
      errors.set('unit_price', 'Giá Tên chỉ cho phép dưới 50 ký tự.');
    }
    return errors;
  };

  const validateErrors = validate(requestBody);
  if (validateErrors.size !== 0) {
    callback(Object.fromEntries(validateErrors), null);
  } else {
    productRepository.getProductBySkuAndName(
      requestBody.sku,
      requestBody.name,
      (error, existingProducts) => {
        if (error) {
          callback(error, null);
        } else if (existingProducts.bySku) {
          callback(
            { message: 'Product with the same SKU already exists' },
            null,
          );
        } else if (existingProducts.byNameProduct) {
          callback(
            { message: 'Product with the same name already exists' },
            null,
          );
        } else {
          let photosArray = [];
          if (requestBody.avatar) {
            requestBody.avatar.forEach((img, index) => {
              const photosExtension = getFilleExtention(img.originalname);
              const photos = `avatar/${index}-${requestBody.name}.${photosExtension}`;
              const photosLocation = './public/' + photos;
              if (pathAvatar) {
                fs.cpSync(pathAvatar, photosLocation);
                photosArray.push(photos);
              } else {
                console.error('Invalid image path:', pathAvatar);
              }
            });
          }
          if (requestBody.gallery) {
            requestBody.gallery.forEach((img, index) => {
              const photosExtension = getFilleExtention(img.originalname);
              const photos = `photosGallery/${index}-${requestBody.name}.${photosExtension}`;
              const photosLocation = './public/' + photos;
              if (pathGallery) {
                fs.cpSync(pathGallery, photosLocation);
                photosArray.push(photos);
              } else {
                console.error('Invalid image path:', pathGallery);
              }
            });
          }
          const newUser = {
            name: requestBody.name,
            sku: requestBody.sku,
            category: requestBody.category,
            description: requestBody.description,
            unit_price: requestBody.unit_price,
            image: photosArray.join(','),
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,
          };
          productRepository.addProduct(newUser, (error, result) => {
            if (pathAvatar && pathGallery) {
              fs.rmSync(pathAvatar);
              fs.rmSync(pathGallery);
            }
            if (error) {
              callback(error, null);
            } else {
              callback(null, result);
            }
          });
        }
      },
    );
  }
};

const getDetailProduct = (params, callback) => {
  productRepository.getDetailProduct(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const deleteProduct = (params, callback) => {
  productRepository.deleteProduct(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

const updateProduct = (params, callback) => {
  productRepository.updateProduct(params, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

export default {
  searchProduct,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};
import url from 'url';
import userRepository from './../repositories/user.repository.js';

export default function (request, response, next) {
  const { pathname } = url.parse(request.url, true);
  const method = request.method;

  if (
    (method === 'POST' && pathname === '/login') ||
    (method === 'POST' && pathname === '/register') ||
    (method === 'GET' && pathname === '/product')
  ) {
    next();
  } else {
    const apiKey = request.header('X-API-Key');
    const apiKeyCustomers = request.header('X-API-Key-customers'); // Lấy khóa của người dùng "customers"

    // Kiểm tra cả hai loại khóa
    if (!apiKey && !apiKeyCustomers) {
      response.status(401).send({
        error: 'Không thể xác thực.',
      });
    } else {
      // Xử lý kiểm tra và xác thực cho cả hai loại khóa ở đây

      if (apiKey) {
        userRepository.getUserByApiKey(apiKey, (error, result) => {
          if (error) {
            response.status(500).send({
              error: error.message,
            });
          } else if (result.length === 0) {
            response.status(401).send({
              error: 'Không thể xác thực.',
            });
          } else {
            const auth = result[0];
            request.auth = auth;
            next();
          }
        });
      }

      if (apiKeyCustomers) {
        userRepository.getUserByApiKeyCustomers(
          apiKeyCustomers,
          (error, result) => {
            if (error) {
              response.status(500).send({
                error: error.message,
              });
            } else if (result.length === 0) {
              response.status(401).send({
                error: 'Không thể xác thực.',
              });
            } else {
              const auth = result[0];
              request.auth = auth;
              next();
            }
          },
        );
      }
    }
  }
}

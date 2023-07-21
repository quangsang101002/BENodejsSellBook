import express, { request, response } from 'express';
const app = express();

//ví dụ trả về HTML
app.get('/', (request, response) => {
  //code thuần
  //   response.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  //   response.write('<h1>Đây là trang chủ</h1>');
  //   response.end();

  //trả về với hàm send của exprss
  response.send('<h1>Đây là trang chủ</h1>');
});

//ví dụ trả về json
app.get('/user/:id', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Thái',
    },
    {
      id: 2,
      name: 'Sáng',
    },
  ];
  const id = req.params.id;

  const user = users.find((u) => u.id == id);

  if (user) {
    res.send(user);
  } else {
    res.send({ error: 'người dùng không tồn tại' });
  }
});
app.get('/about/*', (req, res) => {
  res.send('Đây là trang aboaut');
});

// lấy ví dụ về query string
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'laptop' },
    { id: 2, name: 'tivi' },
  ];
  const { keyword, id } = req.query;

  const result = products.filter((product) => {
    return (
      (keyword && product.name.toLowerCase().includes(keyword.toLowerCase())) ||
      product.id == id
    );
  });
  res.send(result);
});

app.listen(8080, () => {
  console.log('Server chạy thành công');
});

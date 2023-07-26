import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = [];

app.get('/users', (req, res) => {
  const searchUser = req.query.keyword;
  if (searchUser !== undefined) {
    const allUsers = users.filter((user) => {
      return user.username.toLowerCase().includes(searchUser.toLowerCase());
    });
    res.send(allUsers);
  } else {
    res.send(users);
  }
});
app.get('/users/:id', (req, res) => {
  const searchUser = req.params.id;

  const user = users.find((user) => user.id == searchUser);
  if (user) {
    const searchId = users.filter((user) => user.id == searchUser);
    res.send(searchId);
  } else {
    res.send({
      error: 'Không tìm thấy người dùng',
    });
  }
});
const getNextId = (items) => {
  if (items.length === 0) {
    return 1;
  } else {
    const idList = items.map((todo) => {
      return todo.id;
    });

    const maxId = Math.max(...idList);

    return maxId + 1;
  }
};

app.post('/users', (req, res) => {
  const newPush = req.body;
  users.push({
    ...newPush,
    id: getNextId(users),
  });
  res.send(newPush);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, first_name, last_name } = req.body;

  const updateUser = users.map((user) => {
    if (user.id == id) {
      user.username = username;
      user.email = email;
      user.first_name = first_name;
      user.last_name = last_name;
      res.send(user);
    }
  });
  res.send(updateUser);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);
  res.status(204).send();
});

const post = 8009;
app.listen(8009, () => {
  console.log(`Server http://localhost:${post}/ chạy thành công`);
});

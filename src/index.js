// Import the required modules and create the express app
import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
let users = [
  {
    id: 1,
    name: 'quang sang',
    email: 'quang@gmail.com',
  },
];

app.get('/users', (req, res) => {
  res.send(...users);
});
// Get user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const member = users.filter((user) => user.id == id);
  if (member.length > 0) {
    res.send(member);
  } else {
    res.send({
      error: 'không tồn tại người dùng',
    });
  }
});

// Display a form to add a new user
app.get('/', (req, res) => {
  res.send(`
    <form action="http://localhost:8080/users" method="POST">
      <input name="name" placeholder="Name"/>
      <input name="email" placeholder="Email"/>
      <input name="id" placeholder="id"/>
      <button type="submit">Add</button>
    </form>
  `);
});

// Display a form to update user by ID
app.get('/update/:id', (req, res) => {
  const { id } = req.params;
  res.send(`
    <form action="http://localhost:8080/update/${id}" method="POST">
      <input type="hidden" name="_method">
      <input name="name" placeholder="Name"/>
      <input name="email" placeholder="Email"/>
      <button type="submit">Update</button>
    </form>
  `);
});

// Add a new user
app.post('/users', (req, res) => {
  const { id, name, email } = req.body;
  const newUser = { id: parseInt(id), name: name, email: email };
  users.push(newUser);
  res.send(users);
});

// Update user by ID
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updated = users.map((user) => {
    if (user.id == id) {
      user.name = name;
      user.email = email;
    }
    return user;
  });

  res.send(updated);
});

app.listen(8080, () => {
  console.log('Server chạy thành công');
});

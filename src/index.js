import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
const app = express();

// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

const accessLogStream = fs.createWriteStream('src/logs/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.get(
  '/user',
  (req, res, next) => {
    if (req.query.email !== undefined) {
      next();
    } else {
      res.send({
        error: 'Invalid request',
      });
    }
  },
  (req, res) => {
    res.send({ users: [] });
  },
);

app.post('/user', (req, res) => {
  res.send({
    bodypossrer: req.body,
  });
});
app.listen(8009, () => {
  console.log('Server http://localhost:8000/ chạy thành công');
});

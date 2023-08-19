import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import router from './src/application/routers.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('public'));

// Cấu hình body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cấu hình morgan
const accessLogStream = fs.createWriteStream('logs/access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Cấu hình EJS template
app.use('/', router);
app.listen(8000, () => {
  console.log('Server Started');
});

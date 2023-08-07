import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import initWebRouter from './router/routers.js';
import methodOverride from 'method-override';
import configViewEngine from './configs/viewEnggine.js';

const app = express();

// Cấu hình để sử dụng được method PUT/DELETE/... với HTML form
app.use(methodOverride('_method'));

// Cấu hình body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

initWebRouter(app);

// Cấu hình morgan
const accessLogStream = fs.createWriteStream('logs/access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Cấu hình EJS template
configViewEngine(app);

app.listen(8001, () => {
  console.log('Server Started');
});

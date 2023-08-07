const configViewEngine = (app) => {
  // Cấu hình EJS template
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');
};
export default configViewEngine;

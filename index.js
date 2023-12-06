//Librerias externas
require("dotenv").config();

//Crear un servidor básico de Express
const express = require("express");
const app = express();
const routerApi = require("./src/routes");
const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;

//Permitir tráfico en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Ingenieria informatica web 2",
    resave: true,
    saveUninitialized: true,
  })
);
require("./src/config/passport")(app);

//Motor de plantillas EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Importar el controlador de category
const categoryService = require("./src/services/category.services");
const shirtService = require("./src/services/shirt.services");

//Definir las rutas de la aplicación
routerApi(app);

//Home page
app.get("/", async (req, res) => {
  const shirts = await shirtService.index();
  res.render("index", {
    title: `${APP_NAME}`,
    shirts: shirts,
  });
});

//Ruta para mostrar los productos por categoría
app.get("/search", async (req, res) => {
  const desc = req.query.desc;
  const categories = await categoryService.findDesc(desc);
  const shirts = await shirtService.index();
  res.render("category", {
    title: `${APP_NAME}`,
    categories: categories,
    shirts: shirts,
  });
});

//Admin page
app.get("/admin", (req, res) => {
  if (req.user) {
    res.render("admin/index");
  } else {
    res.redirect("/auth/signin");
  }
});

//Contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

//Shopping cart page
app.get("/shopping-cart", async (req, res) => {
  const id = req.query.id || 0;
  const shirts = await shirtService.findOne(id);
  res.render("shopping-cart", {
    shirts: shirts
  });
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});

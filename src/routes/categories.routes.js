//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/category.schema");

//Importar el controlador de category
const service = require("../services/category.services");

//Middleware
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
});

//Definir las rutas de la aplicación
router.get("/categories", async (req, res) => {
  const categories = await service.index();
  res.render("admin/categories/categories", {
    categories: categories,
  });
});

router.get("/create", async (req, res) => {
  res.render("admin/categories/create");
});

router.get(
  "/categories/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const categories = await service.show(id);
    res.render("admin/categories/categories", {
      categories: categories,
    });
  }
);

router.post(
  "/store",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
      const body = req.body;
    const category = await service.store(body);
    res.redirect("/admin/categories/categories");
  }
);

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const categories = await service.show(id);
  res.render("admin/categories/edit", {
    category: categories,
  });
});

router.post(
  "/update",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
      const id = req.body.id;
    const body = req.body;
    const categories = await service.update(id, body);
    res.redirect("/admin/categories/categories");
  }
);

router.post(
  "/destroy/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
      const id = req.params.id;
    const categories = await service.destroy(id);
    res.redirect("/admin/categories/categories");
  }
);

//Exportar el enrutador
module.exports = router;

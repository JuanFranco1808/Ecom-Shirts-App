//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/shirt.schema");

//Importar el controlador de shirts
const service = require("../services/shirt.services");

//Middleware
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
});

//Definir las rutas de la aplicación
router.get("/shirts", async (req, res) => {
  const shirts = await service.index();
  res.render("./admin/shirts/shirts", {
    shirts: shirts,
  });
});

router.get("/create", async (req, res) => {
  res.render("admin/shirts/create");
});

router.get(
  "/shirts/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const shirts = await service.findOne(id);
    res.render("admin/shirts/shirts", {
      shirts: shirts,
    });
  }
);

router.post(
  "/store",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const shirt = await service.store(body);
    res.redirect("/admin/shirts/shirts");
  }
);

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const shirts = await service.show(id);
  res.render("admin/shirts/edit", {
    shirts: shirts,
  });
});

//NO FUNCIONA EL UPDATE :C
router.post(
  "/update",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
    const id = req.body.id;
    const body = req.body;
    const shirt = await service.update(id, body);
    res.redirect("/admin/shirts/shirts");
  }
);

router.post(
  "/destroy/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const shirt = await service.destroy(id);
    res.redirect("/admin/shirts/shirts");
  }
);

//Exportar el enrutador
module.exports = router;

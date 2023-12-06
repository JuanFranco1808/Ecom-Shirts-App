//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/order.schema");

//Importar el controlador de order
const service = require("../services/order.services");

//Middleware
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
});

//Definir las rutas de la aplicación
router.get("/orders", async (req, res) => {
  const orders = await service.index();
  res.render("admin/orders/orders", {
    orders: orders,
  });
});

router.get("/create", async (req, res) => {
  res.render("admin/orders/create");
});

router.get(
  "/orders/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const orders = await service.findOne(id);
    console.log("Orden: ", orders); 
    res.render("admin/orders/orders", {
      orders: orders,
    });
  }
);

router.post(
  "/store",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const order = await service.store(body);
    res.redirect("/");
  }
);

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const orders = await service.show(id);
  res.render("admin/orders/edit", {
    orders: orders,
  });
});

router.post(
  "/update",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
    const id = req.body.id;
    const body = req.body;
    const orders = await service.update(id, body);
    res.redirect("/admin/orders/orders");
  }
);

router.post(
  "/destroy/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const orders = await service.destroy(id);
    res.redirect("/admin/orders/orders");
  }
);

//Exportar el enrutador
module.exports = router;

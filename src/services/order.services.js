const { models } = require("../libs/sequelize");

//Funcion para listar todos los order
async function index() {
  const order = await models.order.findAll();
  return order;
}

//Funcion para crear un nuevo order
async function store(body) {
  const order = await models.order.create(body);
  return order;
}

//Funcion para mostrar un order
async function show(id) {
  const order = await models.order.findByPk(id);
  return order;
}

async function findOne(id) {
  const order = await models.order.findAll({
    where: {
      id: id,
    },
  });
  return order;
}

//Funcion para actualizar un order
async function update(id, body) {
  const [affectedRows, [updatedorder]] = await models.order.update(body, {
    where: {
      id,
    },
    returning: true,
  });
  return updatedorder;
}

//Funcion para eliminar un order
async function destroy(id) {
  const order = await models.order.findByPk(id);
  const deletedorder = await models.order.destroy({
    where: {
      id,
    },
    returning: true,
  });
  if (deletedorder) {
    return order;
  }
  return null;
}

//Exportar las funciones del controlador
module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  findOne,
};

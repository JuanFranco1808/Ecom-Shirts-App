const { models } = require("../libs/sequelize");

//Funcion para listar todos los shirtos
async function index() {
  const shirt = await models.shirt.findAll({
    order: [["name", "ASC"]],
  });
  return shirt;
}

//Funcion para crear un nuevo shirto
async function store(body) {
  const shirt = await models.shirt.create(body);
  return shirt;
}

//Funcion para mostrar un shirto
async function show(id) {
  const shirt = await models.shirt.findByPk(id);
  return shirt;
}

async function findOne(id) {
  const shirt = await models.shirt.findAll({
    where: {
      id: id,
    },
  });
  return shirt;
}

//Funcion para actualizar un shirto
async function update(id, body) {
  const [affectedRows, [updatedshirt]] = await models.shirt.update(body, {
    where: {
      id,
    },
    returning: true,
  });
  return updatedshirt;
}

//Funcion para eliminar un shirto
async function destroy(id) {
  const shirt = await models.shirt.findByPk(id);
  const deletedshirt = await models.shirt.destroy({
    where: {
      id,
    },
    returning: true,
  });
  if (deletedshirt) {
    return shirt;
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

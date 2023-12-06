const { models } = require("../libs/sequelize");

//Funcion para listar todos los category
async function index() {
  const category = await models.category.findAll();
  return category;
}

//Funcion para crear un nuevo category
async function store(body) {
  const category = await models.category.create(body);
  return category;
}

//Funcion para mostrar un category
async function show(id) {
  const category = await models.category.findByPk(id);
  return category;
}

//Buscar por PK
async function findOne(id) {
  const category = await models.category.findAll({
    where: {
      id: id,
    },
  });
  return category;
}

//Buscar por descripcion
async function findDesc(desc) {
  const category = await models.category.findAll({
    where: {
      description: desc,
    },
  });
  return category;
}

//Funcion para actualizar un category
async function update(id, body) {
  const [affectedRows, [updatedcategory]] = await models.category.update(body, {
    where: {
      id,
    },
    returning: true,
  });
  return updatedcategory;
}

//Funcion para eliminar un category
async function destroy(id) {
  const category = await models.category.findByPk(id);
  const deletedcategory = await models.category.destroy({
    where: {
      id,
    },
    returning: true,
  });
  if (deletedcategory) {
    return category;
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
  findDesc,
};

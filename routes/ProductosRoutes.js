let express = require("express");
let ProductosController = require("../controllers/ProductosController");

module.exports = (conexion) => {
  let router = express.Router();
  let productos = new ProductosController(conexion);

  router.get("/agotados", productos.agotados);
  router.get("/bajo-stock", productos.bajoStock);

  router.post("/", productos.guardar);
  router.get("/", productos.traer);
  router.get("/:id", productos.buscar);
  router.put("/:id", productos.actualizar);
  router.delete("/:id", productos.eliminar);

  return router;
};
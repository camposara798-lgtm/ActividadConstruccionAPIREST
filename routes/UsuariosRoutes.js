let express = require("express");
let UsuariosController = require("../controllers/UsuariosController");

module.exports = (conexion) => {
    let router = express.Router();
    let usuarios = new UsuariosController(conexion);

    router.post("/", usuarios.guardar);
    router.get("/", usuarios.traer);
    router.get("/:id", usuarios.buscar);
    router.put("/:id", usuarios.actualizar);
    router.delete("/:id", usuarios.eliminar);
    return router;
};
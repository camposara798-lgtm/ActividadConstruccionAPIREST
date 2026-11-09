let express = require("express")
let PruebaController= require("../controllers/PruebaController")

let router = express.Router()
let prueba = new PruebaController()

router.get("/", prueba.bienvenida)
router.get("/verificar", prueba.verificar)
router.post("/recibir", prueba.recibir)
router.post("/sumar", prueba.sumar)

module.exports=router;
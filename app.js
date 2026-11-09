let express=require("express")
let cors=require("cors")
let mysql=require("mysql2")

let app = express()
app.use(express.json())
app.use(cors())

let conexion = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "adso3312932",
    database:"taller_api",
    port:3306
})
conexion.connect((error)=>{
    if(error){
        console.log("Error al conectar con MySQL:", error.message)
        return
    }
    console.log("Conexion a MySQL exitosa")
})
conexion.on("error", (error)=>{
    console.log("Error en la conexion MySQL:", error.code)
})
let PruebaRoutes = require("./routes/PruebaRoutes");
let UsuariosRoutes = require("./routes/UsuariosRoutes")(conexion); 
let ProductosRoutes = require("./routes/ProductosRoutes")(conexion);

app.use("/prueba", PruebaRoutes);
app.use("/usuarios", UsuariosRoutes);
app.use("/productos", ProductosRoutes);

app.listen(3000, ()=>{
    console.log("Servidor activo en http://localhost:3000")
})
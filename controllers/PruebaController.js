const { json } = require("express")

class PruebaController{
    bienvenida=(req,res)=>{
        res.json({mensaje: "Bienvenido a la API"})
    }
    verificar=(req,res)=>{
        res.json({mensaje: "Servidor funcionando correctamente"})
    }
    recibir=(req,res)=>{
        let datos=req.body || {}
        let {nombre,edad}=datos

        if(!nombre || edad ===undefined){
            return res.json({mensaje: "Debes enviar nombre y edad"})
        }
        res.json({mensaje: "Datos recibidos", nombre: nombre, edad: edad})
    }
    sumar=(req,res)=>{
        let datos=req.body || {}
        let {numero1, numero2}= datos

        if(numero1===undefined || numero2 === undefined){
            return res.json({mensaje:"Debes enviar el numero1 y el numero2"})
        }
        if(isNaN(numero1) || isNaN(numero2)){
            return res.json({mensaje:"Ambos valores deben ser numeros"})
        }
        let resultado=Number(numero1) + Number(numero2)
        res.json({resultado: resultado})
    }   
}
module.exports= PruebaController;
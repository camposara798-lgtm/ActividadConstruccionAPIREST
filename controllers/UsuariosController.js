const { json } = require("express")

class UsuariosController{
    constructor(conexion){
        this.conexion=conexion
    }
    guardar=(req,res)=>{
        let datos = req.body || {}
        let {nombre,apellido,direccion,telefono}=datos

        if(!nombre || !apellido){
            return res.json({mensaje:"El nombre y apellido son obligatorios"})
        }
        let mysql="INSERT INTO usuarios(nombre,apellido,direccion,telefono) VALUES(?,?,?,?)"
        let valores=[nombre,apellido,direccion || null,telefono || null]

        this.conexion.query(mysql,valores,(error,resultado)=>{
            if(error){
                return res.json({mensaje:"Error al guardar el usuario", error:error.message})
            }
            res.json({mensaje:"Usuario registrado", id: resultado.insertId})
        })
    }
    traer=(req,res)=>{
        this.conexion.query("SELECT *FROM usuarios", (error,resultado)=>{
            if(error){
                return res.json({mensaje:"Error al consultar usuarios", error:error.message})
            }
            res.json(resultado)
        })
    }
    buscar=(req,res)=>{
        let id = req.params.id
        this.conexion.query("SELECT * FROM usuarios WHERE id =?", [id],(error,resultado)=>{
            if(error){
                return res.json({mensaje:"Error al buscar el usuario", error:error.message})
            }
            if(resultado.length === 0){
                return res.json({mensaje:"Usuario no encontrado"})
            }
            res.json(resultado[0])
        })
    }
    actualizar=(req,res)=>{
        let id = req.params.id
        let datos =req.body ||{}
        let {nombre,apellido,direccion,telefono}=datos

        if(!nombre || !apellido){
            return res.json({mensaje:"El nombre y apellidos son obligatorios"})
        }
        let mysql = "UPDATE usuarios SET nombre = ?, apellido=?, direccion= ?,telefono= ? WHERE id=?"
        let valores = [nombre,apellido,direccion || null,telefono || null, id]
        this.conexion.query(mysql,valores,(error,resultado)=>{
            if(error){
                return res.json({mensaje:"Errror al actualizar el usuario", error: error.message})
            }
            if(resultado.affectedRows ===0){
                return res.json({mensaje:"Usuario no encontrado"})
            }
            res.json({mensaje:"Usuario actualizado"})
        })
    }
    eliminar =(req,res)=>{
        let id = req.params.id
        this.conexion.query("DELETE FROM usuarios WHERE id=?", [id], (error, resultado)=>{
            if(error){
                return res.json({mensaje: "Error al eliminar el usuario", error: error.message})
            }
            if(resultado.affectedRows === 0){
                return res.json({mensaje: "Usuario no encontrado"})
            }
            res.json({mensaje: "Usuario eliminado"})
        })
    }
}
module.exports= UsuariosController;
class ProductosController {
  constructor(conexion) {
    this.conexion = conexion;
  }
  validar = (datos) => {
    let { nombre, precio, stock } = datos;
    if (!nombre) {
      return "El nombre es obligatorio";
    }
    if (precio === undefined || precio === null || precio === "" || isNaN(precio)) {
      return "El precio debe ser un número";
    }
    if (Number(precio) < 0) {
      return "El precio no puede ser negativo";
    }
    if (stock === undefined || stock === null || stock === "" || !Number.isInteger(Number(stock))) {
      return "El stock debe ser un número entero";
    }
    if (Number(stock) < 0) {
      return "El stock no puede ser negativo";
    }
    return null;
  }
  guardar = (req, res) => {
    let datos = req.body || {};
    let errorValidacion = this.validar(datos);
    if (errorValidacion) {
      return res.status(400).json({ mensaje: errorValidacion });
    }
    let { nombre, descripcion, precio, stock } = datos;
    let sql = "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)";
    this.conexion.query(sql, [nombre, descripcion || null, precio, stock], (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al guardar el producto", error: error.message });
      }
      res.status(201).json({ mensaje: "Producto registrado", id: resultado.insertId });
    });
  }
  traer = (req, res) => {
    this.conexion.query("SELECT * FROM productos", (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al consultar productos", error: error.message });
      }
      res.json(resultado);
    });
  }
  buscar = (req, res) => {
    let id = req.params.id;
    this.conexion.query("SELECT * FROM productos WHERE id = ?", [id], (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al buscar el producto", error: error.message });
      }
      if (resultado.length === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json(resultado[0]);
    });
  }
  actualizar = (req, res) => {
    let id = req.params.id;
    let datos = req.body || {};
    let errorValidacion = this.validar(datos);
    if (errorValidacion) {
      return res.status(400).json({ mensaje: errorValidacion });
    }
    let { nombre, descripcion, precio, stock } = datos;
    let sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    this.conexion.query(sql, [nombre, descripcion || null, precio, stock, id], (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json({ mensaje: "Producto actualizado" });
    });
  }
  eliminar = (req, res) => {
    let id = req.params.id;
    this.conexion.query("DELETE FROM productos WHERE id = ?", [id], (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json({ mensaje: "Producto eliminado" });
    });
  }
  agotados = (req, res) => {
    this.conexion.query("SELECT * FROM productos WHERE stock = 0", (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al consultar agotados", error: error.message });
      }
      res.json(resultado);
    });
  }
  bajoStock = (req, res) => {
    this.conexion.query("SELECT * FROM productos WHERE stock < 5", (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al consultar bajo stock", error: error.message });
      }
      res.json(resultado);
    });
  }
}
module.exports = ProductosController;
const {model, Schema} = require("mongoose");

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    contrasena: {type: String, required: true}
})
//creamos y exportamos el modelo 
module.exports = model("Usuario", usuarioSchema)
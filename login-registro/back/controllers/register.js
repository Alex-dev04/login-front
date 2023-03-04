const bcrypt = require("bcrypt");
const Usuario = require("../model/Usuario")

const register = (req, res) => {
    //traemos del body nuestras credenciales
    const {nombre, email, contrasena} = req.body;
    //verificamos si en bd hay un correo igual al que estan introducciendo en req.body
    Usuario.findOne({email}).then((usuario) => {
        if(usuario){
            return res.json({mensaje:"este correo ya existe"})
        }
        //tambien verificamos si el usuario esta llenando todos los campos 
        else if(!nombre || !email || !contrasena){
            return res.json({mensaje:"llene todo los campos requeridos"})
        }
        //si todo va bien, entonces hasheamos la contrasena, y verificamos que se hizo correctamente
        else{
            bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {
                if(error){
                    return res.json({mensaje:`hubo un error ${error}`})
                }
                //si va bien, guardamos los datos nuevos en el modelo
                else{
                    const nuevoUsuario = new Usuario({
                        nombre,
                        email,
                        contrasena:contrasenaHasheada
                    })
                    //despues de guardamos los datos en el modelo, lo guardamos en base de datos
                    nuevoUsuario.save()
                    .then((usuario) => {
                        return res.json({mensaje:"usuario creado correctamente", usuario})
                    })
                    .catch((error) => {console.error(error)})
                }
            })
        }
    })

}
module.exports = register;
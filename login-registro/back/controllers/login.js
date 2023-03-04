const bcrypt = require("bcrypt");
const Usuario = require("../model/Usuario")
const login = (req, res) => {
    //destructuramos para solo tener el email y la contrasena del body
    const {email, contrasena} = req.body;
    //preguntamos si el email del body es igual al de base de datos
    Usuario.findOne({email}).then((usuario) => {
        if(!usuario){
            return res.json({mensaje:"este usuario no existes"})
            //si lo anterior se valida bien, ahora comparamos la contrasena que hemos hasheado
        }else{
            bcrypt.compare(contrasena, usuario.contrasena)
            .then((esCorrecta) => {
                if(esCorrecta){
                    const {nombre, email} = usuario;
                    return res.json({mensaje:"usuario logueado correctamente", user:{
                        nombre,
                        email,
                        usuario
                    }})
                    // si la contrasena es incorrecta, mandamos este mensaje
                }else{
                    return res.json({mensaje:"contrasena incorrecta "})
                }
            })
        }
    })
}

module.exports = login;
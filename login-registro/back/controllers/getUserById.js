const Usuario = require("../model/Usuario");

const getUserById = (req, res) => {
    //destructuramos para obtener el paramatro de la url
    const {userId} = req.params;
    //comparamos si la longitud del id del parametro es de 24, porque es como mongo lo pone
    if(userId.length === 24){
        Usuario.findById(userId).then((usuario) => {
            if(!usuario){
                return res.json({mensaje:"usuario no encontrado"})
            }else{
                const {_id, contrasena, __v, ...resto} = usuario._doc
                res.json(resto)
            }
        })
    }else{
        res.json({mensaje:"estas enviando una contrasena incorrecta"})
    }
}

module.exports = getUserById;
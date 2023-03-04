const mongoose = require("mongoose");
//2-1-campturamos la url de nuestra bd de trabajo
const URL_MONGO = "mongodb://localhost/primerLoginNode";

//2-2-con esta funcion averiguamos si esta funcionando
const db = async ()=>{
    await mongoose
    .connect(URL_MONGO)
    .then(() => {console.log("DB en funcionamiento")})
    .catch((error) => {console.error(error)})
};
//2-3-exportamos la funcion
module.exports = db
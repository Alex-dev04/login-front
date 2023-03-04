const express = require("express");
const cors = require("cors");
//2-5-requiero la bd para ver si funciona
const db = require("./database/db")
//requiero los controlers
const controllers = require("./controllers");
//1-guardamos en una variable la funcion de express 
const app = express();
const PORT = 4000;
//3-esto es para mandar data y manejar del front al back y viceversa
app.use(cors());

//4-para poder usar la info del body, post, put, etc
app.use(express.json());

//creamos nuestra url y las juntamos con sus respectivas funcionalidad
app.get("/user/:userId", controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);


//2-hacemos funcional el servidor
app.listen(PORT, () => {
    console.log(`servidor funcionando el puerto ${PORT}`);
    //2-6-llamamos a la bd para ver si funciona
    db();
})

//5-al final al que exportar nuestra instacia express

module.exports = app;
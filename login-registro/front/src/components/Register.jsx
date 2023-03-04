import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Register = () => {
    const navigate = useNavigate();

    //usamos el state para crear un objeto con los valore del formulario
    const [Input, setInput] = useState({
        nombre: "",
        email: "",
        contrasena: ""
    });
    //
    const [Mensaje, setMensaje] = useState();
    const [Loading, setLoading] = useState(false)

 //destructuramos en Input
    const {nombre, email, contrasena} = Input;

//guardamos los valores introducido por el usuario
    const onChange = (e) => {
        setInput({ ...Input, [e.target.name]: e.target.value });
      };

//preguntamos si la cadenas de texto no estan vacias
    const onSubmit = async (e) => {
        e.preventDefault();
        if(nombre != "",email != "",contrasena != "" ){
            //si no estan vacia las guardamos en un objeto
            const Usuario = {
                nombre,
                email,
                contrasena
            };

            //enviamos los datos a la base de datos 
            setLoading(true)
            await axios.post("http://localhost:4000/register", Usuario)
            .then((data) => {
                setMensaje(data.mensaje)

                //luego de que se envio correctamente los reseteamos y el mensaje con el settimeout
                setInput({
                    nombre: "",
                    email: "",
                    contrasena: ""
                })
                setTimeout(() => {
                    setMensaje("")
                    navigate("/login")
                },1500)
                  
            })
            //si falla mandamos un mensaje con el error y luego lo reseteamos con el settimeout
            .catch((error) => {
                setMensaje("hubo un error: "+error)

                setTimeout(() => {
                    setMensaje("")
                },1500)
            })
            //el loading lo regresamos a false, lo cual significa que la peticion termino
            setLoading(false)
        }
    }
  return (
    <div>
        <h3>bienvenido a la pagina</h3>
        <h2>de registro!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
            //nombre
            <div>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text"
                    value={nombre} 
                    onChange={(e) => onChange(e)}
                    id='nombre' 
                    name='nombre' 
                    placeholder='nombre...' 
                    autoComplete='off' />
                </div>
            </div>

            //email
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    value={email} 
                    onChange={(e) => onChange(e)}
                    id='email' 
                    name='email' 
                    placeholder='email...' 
                    autoComplete='off' />
                </div>
            </div>

            //contrasena
            <div>
                <div>
                    <label htmlFor="contrasena">Contrasena</label>
                    <input type="password"
                    value={contrasena} 
                    onChange={(e) => onChange(e)}
                    id='contrasena' 
                    name='contrasena' 
                    placeholder='contrasena...' 
                    autoComplete='off' />
                </div>
            </div>
            <button type="submit">{
                //si es true significa que se esta haciendo la peticion y hay que esperar
            Loading ? "...cargando" : "Registrarse"
            
            }</button>
            <p>ya tienes cuenta? <b onClick={() => navigate("/login")}>Iniciar sesion</b></p>
        </form>
        {Mensaje && <div>{Mensaje}</div>}
    </div>
  )
}

export default Register
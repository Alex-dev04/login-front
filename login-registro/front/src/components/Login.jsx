import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Login = () => {
    const navigate = useNavigate();

    //usamos el state para crear un objeto con los valore del formulario
    const [Input, setInput] = useState({
        email: "",
        contrasena: ""
    });
    //
    const [Mensaje, setMensaje] = useState();
    const [Loading, setLoading] = useState(false)

 //destructuramos en Input
    const {email, contrasena} = Input;

//guardamos los valores introducido por el usuario
    const onChange = (e) => {
        setInput({ ...Input, [e.target.name]: e.target.value });
      };

//preguntamos si la cadenas de texto no estan vacias
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email != "",contrasena != "" ){
            //si no estan vacia las guardamos en un objeto
            const Usuario = {
                email,
                contrasena
            };

            //enviamos los datos a la base de datos 
            setLoading(true)
            await axios.post("http://localhost:4000/login", Usuario)
            .then(({data}) => {
                setMensaje(data.mensaje)
                console.log(data)

                //luego de que se envio correctamente los reseteamos y el mensaje con el settimeout
                setInput({
                    email: "",
                    contrasena: ""
                })
                setTimeout(() => {
                    setMensaje("")
                    navigate(`/welcome/${data.user.usuario._id}`)
                },3000)
                  
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
        <h2>de Inicio de sesion!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
           
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
            <p>no tienes cuenta? <b onClick={() => navigate("/")}>Crear cuenta</b></p>
        </form>
        {Mensaje && <div>{Mensaje}</div>}
    </div>
  )
}

export default Login
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Welcome = () => {
  const [name, SetName] = useState("");
  const navigate = useNavigate();
//ojo al momento de cojer algun paramatro del url, destructuralo
  const {id} = useParams();
console.log(id)
//uso un userEffect que se actualice cada vez que el id cambia
  useEffect(() => {
    axios.get(`http://localhost:4000/user/${id}`)

    .then(({data}) =>{
      console.log(data)
     SetName(data.nombre)
    })

    .catch((error) => {
      console.error(error)
    })

  }, [id])

  const cerrarSesion = () => {
    SetName("");
    navigate("/login")
  }

  return (
    <div>
      <h2> {name ? `bienvenid@s ${name}` : `ERROR este usuario no existe`}</h2>
      <button onClick={e => cerrarSesion(e)}>cerrarSesion</button>
    
    </div>
    
  )
}

export default Welcome
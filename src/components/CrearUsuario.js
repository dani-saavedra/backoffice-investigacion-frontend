
// nombre: String
// identificacion:Int
// clave: String

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";

// perfil: String
const CrearUsuario = () => {
    const his = useHistory();

    let nombre, identificacion, clave, perfil

    const registrarUsuarioNuevo = async (e) => {
        e.preventDefault()
        let nuevoUsuario = {
            "nombre": nombre.value,
            "identificacion": parseInt(identificacion.value),
            "perfil": perfil.value,
            "clave": clave.value
        }
        const response = await crearUser({ variables: { user: nuevoUsuario } })
        if (response?.data?.createUser) {
            alert("Usuario Creado")
            his.push("/")
        } else {
            alert("Se presento un error")
        }
    }

    const CREAR_USUARIO = gql`
        mutation CreateUser($user: UserInput) {
            createUser(user: $user)
        }
    `
    const [crearUser] = useMutation(CREAR_USUARIO)



    return <div>
        <form>
            <div className="form-group">
                <label>Nombre</label>
                <input className="form-control" ref={val => nombre = val}></input>
            </div>
            <div className="form-group">
                <label>Identificacion</label>
                <input type="number" className="form-control" ref={val => identificacion = val}></input>
            </div>
            <div className="form-group">
                <label>Clave</label>
                <input type="password" className="form-control" ref={val => clave = val}></input>
            </div>
            <div className="form-group">
                <label>Perfil</label>
                <select className="form-control" ref={val => perfil = val}>
                    <option></option>
                    <option value="Lider">Lider</option>
                    <option value="Admin">Admin</option>
                    <option value="Estudiante">Estudiante</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={registrarUsuarioNuevo}>Registrarse</button>
        </form>
    </div>
}

export default CrearUsuario;
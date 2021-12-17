import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useState } from "react";
import { useHistory } from "react-router";


const Login = () => {
    const his = useHistory();
    let user;
    const [pass, setPass] = useState("")
    const AUTENTICAR_USUARIO = gql`
        mutation autenticar($usuario:String,$clave:String){
            autenticar(usuario:$usuario,clave:$clave){
                status
                jwt
            }
        }
    `
    const changeClave = (e) => {
        e.preventDefault();
        setPass(e.target.value)
    }
    const [auth] = useMutation(AUTENTICAR_USUARIO)
    const autenticar = async (e) => {
        e.preventDefault();

        const { data: { autenticar } } = await auth({
            variables: {
                usuario: user.value,
                clave: pass
            }
        })
        if (autenticar.status != 200) {
            alert("Usuario y/o contrasena invalida")
        } else {
            localStorage.setItem('auth_token', autenticar.jwt)
            his.push("/menu")
        }
    }
    const registroUsuarioNuevo = () => {
        his.push("/usuario/registro")
    }
    return <div>
        <form>
            <h3>Autenticar</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email" id="username" ref={u => user = u} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password"
                value={pass}
                onChange={changeClave} />

            <button className="btn btn-primary" onClick={autenticar}>Log In</button>

            <button className="btn btn-primary" onClick={registroUsuarioNuevo}>Registro Usuario Nuevo</button>
        </form>
    </div>
}

export default Login
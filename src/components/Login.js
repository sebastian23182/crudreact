import React from "react";
import { usePostLogin } from "../hooks/usePostLogin";
import { useGetTokenStatus } from "../hooks/useGetTokenStatus";

useGetTokenStatus();

function Login({ status, setStatus }) {
    const onSubmit = (e) => {
        e.preventDefault();
        if(!e.target.EMAIL.value || !e.target.PASSWORD.value){
            return false
        }else{
            try {
                const admin = {
                    EMAIL: e.target.EMAIL.value, 
                    PASSWORD: e.target.PASSWORD.value, 
                }
                usePostLogin(admin, setStatus);
                setTimeout(() => {
                    setStatus(null)
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <section className="FormContainer">
            <form method="POST" onSubmit={onSubmit}>
                <div className="FormHeader">
                    <h2>Login administrador</h2>
                </div>
                <label>Correo electronico</label>
                <input name="EMAIL" type="text" placeholder="email@gamers.com" required/>
                <label className="FormLabel">Contraseña</label>
                <input name="PASSWORD" className="FormInputs" type="password" placeholder="*********" required/>
                <input className="Submit" type="submit"/>
            </form>
            {status === 401 && (
            <div className="postSuccess">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" fill="rgba(243,95,95,1)"></path></svg>
                <h1>Nombre de usuario o contraseña incorrectos</h1>
            </div>
            )}
        </section>
    )
}

export { Login }
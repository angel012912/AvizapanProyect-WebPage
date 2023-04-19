import "../Styles/styleLanding.css";
import imagen from "../Assets/logoa.png";
import {useEffect, useState} from "react";
import axios from "axios";

const bcrypt = require('bcryptjs');
const url = "https://avizapan-app-3s4eu.ondigitalocean.app/";


function LogIn({setSuccess, setAdminId}){
    async function validateToken(token){
        try {
            const {data} = await axios.get(`${url}admins/token`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setAdminId(data.userId);
            setSuccess(true);
        }catch{
            localStorage.removeItem("tokenAvizapan");
            setMessageError('Sesion Finalizada. Favor de ingresar de nuevo.');
            setError(true);
        }

    }
    
    if (localStorage.getItem("tokenAvizapan")){
        validateToken(localStorage.getItem("tokenAvizapan"));
    }
    const[usuario, setUsuario] = useState(null);
    const[contra, setContra] = useState(null);
    const[disable, setDisable] = useState(true);
    //Error Alert
    const[error, setError] = useState(false);
    const[messageError, setMessageError] = useState();

    useEffect(()=> {
        if(usuario && contra){
            setDisable(false);
        }else{
            setDisable(true);
        }
    }, [usuario, contra])

    async function logIn(body){
        const data = await axios.post(`${url}admins`, body);
        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var hash = bcrypt.hashSync(contra, 10);
        try{
            const {data} = await logIn({username: usuario, password: hash});
            localStorage.setItem("tokenAvizapan", data.token);
            setAdminId(data.id);
            setSuccess(true);
        }catch{
            setMessageError('Usuario o Contraseña Incorrecta');
            setError(true);
        }   
    }  

    if (error){
        setTimeout(()=>{
            setError(false)
        }, 2000);
    } 

    return(
        <div className="contendor">
            {error && 
            (
            <div className="alert alert-danger d-flex align-items-center alertaError" role="alert">
                <div>
                    {messageError}
                </div>
            </div>)}
            <div className="contendor-login">
                <div className="logo-login">
                    <img src={imagen} width="450px" alt="Logo Atizapan" />
                </div>
                <hr className="hr" width="3" size="500" color="#000000"/>
                <div className="logIn">
                    <form action="">
                        <p className="titulo-login">
                            LOG IN
                        </p>
                        <div className="form-floating input-login mb-4">
                            <input type="text" name="usuario" className="form-control" placeholder="name@example.com" value={usuario} onChange={e => {setUsuario(e.currentTarget.value)}}/>
                            <label htmlFor="usuario">Usuario</label>
                        </div>
                        <div className="form-floating input-login ">
                            <input type="password" className="form-control" name="contraseña" placeholder="Password" value={contra} onChange={e => {setContra(e.currentTarget.value)}} />
                            <label htmlFor="contraseña">Password</label>
                        </div>
                        <br />
                        <button type="button" className="btn btn-outline-primary send-login" disabled={disable} onClick={handleSubmit} >Entrar -{">"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
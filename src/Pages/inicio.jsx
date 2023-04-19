import LogIn from "../Components/LogIn";
import Avisos from "../Components/avisos";
import {useState} from "react";

function Inicio(){
    const [success, setSuccess] = useState(false);
    const [adminId, setAdminId] = useState(null);
    
    return(success ? (<Avisos adminId={adminId} setSuccess={setSuccess} />) : (<LogIn setSuccess={setSuccess} setAdminId={setAdminId}/>));
}

export default Inicio;
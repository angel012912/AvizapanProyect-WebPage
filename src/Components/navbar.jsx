import imagen from "../Assets/descarga (4).jfif";
import Dashboard from "./dashboard";
import Form from "./form";

function Navbar({setPagina, setSuccess}){
    const handleCerrarSesion = () => {
        localStorage.removeItem("tokenAvizapan");
        setSuccess(false);
    }

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <span className="navbar-brand" href="#"><img src={imagen} alt="Logo Atizapan" width="50px"/></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={()=> {setPagina(<Form/>)}} >Avizapan</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={() => {setPagina(<Dashboard/>)}}>Estadísticas</button>
                        </li>
                        <li className="nav-item cerrar-sesion">
                            <button className="nav-link btn" onClick={handleCerrarSesion}>Cerrar Sesion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Navbar;
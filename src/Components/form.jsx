import {useState, useEffect} from 'react';
import axios from "axios";
import "../Styles/styleAvisos.css";

const url = "https://avizapan-app-3s4eu.ondigitalocean.app/";

async function getLocation(zipcode){    
    try{
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&region=mx&key=${process.env.REACT_APP_API_KEY}`);
        return data;
    }catch{
        return null;
    }
}

async function getCategories({setCategories}){
    try{
        const {data} = await axios.get(`${url}categories`);
        setCategories(data);
    }catch{
        setCategories([]);
    }
}

function Form({adminId}){
    //Variables que guardan el estado de los valores que se meten en los input
    const [title, setTitulo] = useState();
    const [categoryId, setCategoria] = useState();
    const [description, setDescripcion] = useState();
    const [tiempo, setTiempo] = useState();
    const [lugar, setLugar] = useState()
    //Variable que habilita o deshabilita el boton de enviar
    const [disable, setDisable] = useState(true)
    const [enviado, setEnviado] = useState(false);
    //Lista de categorias obtenidas de la bd
    const [categories, setCategories] = useState([]);
    const [selectOptions, setSelectOptions] = useState();

    //Esta funcion se ejecuta cuando uno de los valores definidos cambian 
    useEffect(()=>{
        if (title && (categoryId > 0 ) && description && tiempo && lugar){
            setDisable(false);
        }else{
            setDisable(true);
        }
    }, [title, categoryId, description, tiempo, lugar]);

    if(categories.length === 0){
        getCategories({setCategories});
    }else{
        const select = categories.map((category)=>{
            return ( 
                <option value={category.id}>{category.category.toUpperCase()}</option>
            )
        });
        if (!selectOptions) setSelectOptions(select);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getLocation(lugar);
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        axios.post(
            `${url}notifications`, {title: title, description: description, location: lugar, latitude: lat, longitude: long, adminId: adminId, duration: tiempo, categoryId: categoryId}
        ).then((respone) => {console.log(respone.data);});
        setEnviado(true);
        reset();
    }


    const reset = () => {
        setTitulo('');
        setCategoria('');
        setDescripcion('');
        setTiempo('');
        setLugar('');
    }


    if (enviado){
        setTimeout(()=>{
            setEnviado(false);
        }, 2000);
    }


    return(
        <>
        <div className='avisos-div'>
            {enviado && (
            <div class="alert alert-success desaparecer" role="alert">
                Alerta Registrada con éxito!
            </div>)}
            <h1>
                Registrar Nueva Alerta
            </h1>
            <div className='formulario-div'>
                <form action="" className="formulario">
                    <div className="form-floating titulo">
                        <input type="text" name="titulo" className="form-control" placeholder="name@example.com" value={title} onChange={e => setTitulo(e.currentTarget.value)} required/>
                        <label htmlFor="titulo">Titulo Alerta</label>
                    </div>
                    <select name="categoria" className="form-select categoria" value={categoryId} onChange={e => setCategoria(e.currentTarget.value)} aria-label="Default Select Example">
                        {selectOptions}
                    </select>
                    <div className="form-floating descripcion">
                        <textarea name="descripcion" className="form-control" placeholder="Leave a comment here" value={description} onChange={e => setDescripcion(e.currentTarget.value)} required></textarea>
                        <label htmlFor="descripcion">Descripcion</label>
                    </div>
                    <div className='tiempoCodigo'>
                        <div className="form-floating tiempo">
                            <input type="number" className="form-control" autoFocus name="tiempo" value={tiempo} onChange={e => setTiempo(e.currentTarget.value)} required/>
                            <label htmlFor="tiempo">Duracion Alerta (Hrs)</label>
                        </div>
                        <div className="form-floating agregarUbi">
                            <input type="number" className="form-control" autoFocus name="zipcode" value={lugar} onChange={e => setLugar(e.currentTarget.value)} required/>
                            <label htmlFor="tiempo">Código Postal</label>
                        </div>
                    </div>
                    <button type="submit" className="enviarAlerta" onClick={handleSubmit} disabled = {disable}>Enviar Alerta</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Form;

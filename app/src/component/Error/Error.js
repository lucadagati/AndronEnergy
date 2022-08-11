import Button from 'react-bootstrap/Button';
import './Error.css';

function Error(){

    return(
        <div className="Error">
            <h2 style={{color: "#D8000C"}}>Qualcosa è andato storto per favore riprova più tardi</h2>
            <p style={{fontWeight:"600"}}>L'operazione non ha avuto successo premi il bottone per riprovare</p>
                <Button  className="btn-secondary" style={{float:"right"}}onClick={()=>window.location.reload()}>
                    Ricarica
                </Button>
        </div>
    )
}


export default Error;
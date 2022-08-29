import Button from 'react-bootstrap/Button';
import './Error.css';
import useSections from '../../context/auth/sectionFlag/useSections';

function Error(){
    const sections=useSections();
    return(
        <div className="Error">
            <h2 style={{color: "#D8000C"}}>L'operazine non è andata a buon fine</h2>
            <p style={{fontWeight:"600",marginTop:"40px"}}>L'operazione non ha avuto successo premi il bottone per riprovare</p>
            <div style={{marginTop:"10px",width:"100%",height:"30%"}}>
                <p style={{fontWeight:"600"}}>Errore: </p>
                <div style={{width:"100%",backgroundColor:"white",borderRadius:"8px"}}>
                <p style={{fontWeight:"600",padding:"20px",overflow:"auto",color:"red",textAlign:"center"}}> {sections.errorMessage}</p>
                </div>
                <Button  className="btn-primary" style={{float:"right"}}onClick={()=>{sections.setLoading(false);sections.setError(false);sections.setErrorMessage(false)}}>
                    Riprova
                </Button>
                </div>
                
        </div>
    )
}


export default Error;
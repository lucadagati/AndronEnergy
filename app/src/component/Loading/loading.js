


function Loading(props){
    return (
        <div>        
            <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem",marginTop:'80px'}}>{props.type.toUpperCase()}</h3>
            <div className='loading'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Loading;
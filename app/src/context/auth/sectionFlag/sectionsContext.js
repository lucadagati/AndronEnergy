import { createContext,useState } from "react";

const SectionsContext=createContext({});


export const SectionsProvider=({children})=>{
    
    const [info,setInfo]=useState(false);
    const [add,setAdd]=useState(false);
    const [error,setError]=useState(false);
    const [render,setRender]=useState(true);
    const [loading,setLoading]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [complete,setComplete]=useState(false);


    return (
        <SectionsContext.Provider value={{errorMessage,setErrorMessage,info,setInfo,add,setAdd,error,setError,loading,setLoading,render,setRender,complete,setComplete}}>
            {children}
        </SectionsContext.Provider>
    )

}

export default SectionsContext;
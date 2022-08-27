import { createContext,useState } from "react";

const GeneralContext=createContext({});


export const GeneralProvider=({children})=>{
    const [pods,setPods]=useState();
    const [comunities,setComunities]=useState();
    const [plants,setPlants]=useState();
    const [userConsumptions,setUserConsumptions]=useState();
    const [table,setTable]=useState();
    const [type,setType]=useState();

    return (
        <GeneralContext.Provider value={{type,setType,table,setTable,pods,setPods,comunities,setComunities,plants,setPlants,userConsumptions,setUserConsumptions}}>
            {children}
        </GeneralContext.Provider>
    )

}

export default GeneralContext;
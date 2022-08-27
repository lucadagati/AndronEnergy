import { useContext} from "react";
import GeneralContext from "./generalContext";

const useGeneral=()=>{
    return useContext(GeneralContext);
}


export default useGeneral;
import { useContext} from "react";
import SectionsContext from "./sectionsContext";

const useSections=()=>{
    return useContext(SectionsContext);
}


export default useSections;
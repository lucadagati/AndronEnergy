
export function text_control(elem){
    let res1='';
    let control=/[.,/#!$%^&*;:{}= _`'"~()\s]/g;
    let char_check=/[a-zA-Z]/g;
    let res2=elem.match(char_check);
    res1=elem.match(control);
    
    if(!elem){
        return "Devi inserire un nome identificativo";
    }
    if(res1){
        return "Puoi inserire solo lettere e numeri";

    }
    else if(!res2){
        return "Devi inserire delle lettere";
    }
    else {
        return '';
    }

    }


    export function select_control(elem,type){
        console.log(elem)
        if(!elem){
            console.log(1)
            return  "Devi selezionare un "+type;;
        }
        if(elem==="Seleziona"){
            console.log(2)
            return "Devi selezionare un "+type;
        }
        else {
            console.log(3)
            return '';
        }
    }
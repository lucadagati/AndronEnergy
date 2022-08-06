export function formatData(val){
    let res=Object.values(val);
    res=res.map((val,key)=>{
        if(typeof(val)==="object"){
            //console.log(val)
            return val.map((val)=>{
                let keys=Object.keys(val)
                let reg=/Energy/g
                if(keys[0].match(reg)||keys[0].match('time')||keys[0].match('storedEnergy')||keys[0].match('consumption')){
                    let res= Object.values(val);
                    res=[...res,keys[0]]
                    return res;
                }
                else return val
            })
        }
        else return val;  
    })
    return res;
}


export function capitalize(data){
    
    const str2 = data.charAt(0).toUpperCase() + data.slice(1);
    return str2;
}
export function formatData(val){
    let res=Object.values(val);
    res=res.map((val,key)=>{
        if(typeof(val)==="object"){
            //console.log(val)
            return val.map((val)=>{
                let keys=Object.keys(val)
                //console.log(keys[0])
                if(keys[0].match('exchangedEnergy')||keys[0].match('time')||keys[0].match('storedEnergy')||keys[0].match('consumption')){
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
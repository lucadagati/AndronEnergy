import axios from './axios'

export  async function login(username,psw){
    let data={
        username:username,
        password:psw
    } 
    try{
        let res=await axios.post('admin/login',JSON.stringify(data),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(res);
        return res;
            }

    catch (err) {
        if(err.response?.status===400)
            return {error:"Errore username o password"}
        else if(!err.response){
            return {error:"Login fallito"};
        }
        else if(err.response?.status===401){
            return err.response;
        }
        else if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
}
}
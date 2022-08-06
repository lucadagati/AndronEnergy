import axios from "axios";

export  async function login(username,psw){
    let data={
        username:username,
        password:psw
    } 
    try{
        let res=await axios.post('http://localhost:8060/admin/login',data);
        console.log(res);
            }

    catch (err) {
        // Handle Error Here
        console.error(err);
    }

}
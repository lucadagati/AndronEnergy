const jwt = require("jsonwebtoken");
const db = require('../../database');


const verifyToken=(req,res,next)=>{
    const auth=req.headers.authorization || req.headers.Authorization;
    if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = auth.split(' ')[1];
    jwt.verify(token,
    "nvnrejvuerhv34ofi3vipk3202jwenclkwencnwdjcwcndv23vdwevcwec",
    (err,decode)=>{
            if(err){
                return res.sendStatus(403); //invalid token
            }
            req.user = decode.username;
            next();
                
        })
    }


module.exports=verifyToken;
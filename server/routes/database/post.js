var express = require('express');
const bcrypt=require('bcryt');
const db = require('../../database');
var router = express.Router();

router.post('/addUser/',(req,res)=>{
    var errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data={
        email:req.body.mail,
        password:bcrypt.hashSync(req.body.password,10),
        random:req.body.random
    }

    var query="INSERT INTO user (email, password , random_val) VALUES (?,?,?)";
    var params =[ data.email, data.password,data.random];
    db.run(query,params,function(err,res){
        if(err){
            return res.status(400).json({"error":err.message});
        }
        res.status(200).json(
            {"message":"success","data":row}
        )
    })
})




router.patch('/activate/:mail',(req,res)=>{
    var data ={email:req.params.email};
    db.run(
        `UPDATE user set 
           active=1
           WHERE email = ?`,[data.email],(err,result)=>{
            if(err){
                return res.status(400).json({"error":res.message});
            }
            res.json(
                {"message":"success","data":row}
                )
           }
    )
})

module.exports = router;
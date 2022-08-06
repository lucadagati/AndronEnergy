var express = require('express');
var bcrypt=require('bcrypt');
const db = require('../../database');
const jwt=require("jsonwebtoken");
var router = express.Router();
const verifyToken=require('./verifyToken')
const uid=require('rand-token');
//require('dotenv').config();


/*
router.post('/add/',verifyToken,(req,res)=>{

    /*if(!row){
        res.status(403).json({message:"Invalid token"});
    }
    else{
        res.status(403).json({message:"Access denied"});
    }
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
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        random:req.body.random
    }

    var query="INSERT INTO user (email, password , random_val) VALUES (?,?,?)";
    var params =[ data.email, data.password,data.random];
    db.run(query,params,function(err,row){
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
           WHERE email = ?`,[data.email],(err,row)=>{
            if(err){
                return res.status(400).json({"error":row.message});
            }
            res.json(
                {"message":"success","data":row}
                )
           }
    )
})
*/
router.post('/login',(req,res)=>{
    var errors=[];
    const reg=/^[\w&.\-]+$/g;
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.username){
        errors.push("No email specified");
    }
    /*if(req.body.username.match(reg)){
        errors.push("Wrong character selection");
       
    }*/
    if (errors.length){
        return res.status(400).json({"error":errors.join(",")});
    }
    var username='';

    var query1="select * from user where username=?";
    db.get(query1,req.body.username,(err,row)=>{
        if(err){
            return res.status(500).json({"error":err.message});
        }

        else if(bcrypt.compareSync(
            bcrypt.hashSync(req.body.password,10),
                row.password)){
            return res.status(401).json({"Error": "Wrong password"});

        }
        username=row.username;
        var token=jwt.sign(
            {id:row.id,
            username: username},
            "nvnrejvuerhv34ofi3vipk3202jwenclkwencnwdjcwcndv23vdwevcwec",
            {expiresIn: '600s'}
            );
            
        var refresh_token=jwt.sign(
            {"username":username},
            "gerh7rsvrdlv4ehroqf94fojfiejwivernvjernver1vaoijfi",
            { expiresIn: '1d' }
            )
        let check_exist="SELECT * from token WHERE username=?";
        db.get(check_exist,username,(err,row2)=>{
            if(err){
                return res.status(500).json({"error":err.message});
            }
            else if(row2){
                let query_exist="UPDATE token SET token_data=(?) WHERE username=(?)"
                let params=[refresh_token,username];
                db.run(query_exist,params,(err)=>{
                    if(err){
                        return res.status(500).json({"error":err.message});
                        }

                });
            }
            else{
                let query_not_exist="INSERT INTO token(token_data,username) VALUES (?,?)";
                let params=[token,username];
                db.run(query_not_exist,params,(err)=>{
                    if(err){
                        return res.status(500).json({"error":err.message});
                        }
                });
            }

        })
       res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
       res.status(200).json({message: "Login successfull",
            accessToken: token })
    });
})



router.post('/refreshToken/',(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refresh_token=cookies.jwt;

    let query="Selecct * FROM token WHERE token_data=?";
    let params=[refresh_token];
    db.get(query,params,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        jwt.verify(
                refresh_token,
                "gerh7rsvrdlv4ehroqf94fojfiejwivernvjernver1vaoijfi",
                (err, decoded) => {
                    if (err || row.username !== decoded.username) return res.sendStatus(403);
                    var token=jwt.sign(
                        {id:first_result.id,
                        username:row.user_id},
                        "nvnrejvuerhv34ofi3vipk3202jwenclkwencnwdjcwcndv23vdwevcwec",//process.env.JWT_SECRET
                        {expiresIn: '600s'}
                        );
                    res.status(200).json({token});
                }
            )
        })
    })

module.exports = router;
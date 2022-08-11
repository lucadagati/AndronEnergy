var express = require('express');
var bcrypt=require('bcrypt');
const db = require('../../database');
const jwt=require("jsonwebtoken");
var router = express.Router();
const verifyToken=require('./verifyToken')
//const uid=require('rand-token');
//require('dotenv').config();



router.post('/add/',verifyToken,(req,res)=>{
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    if(!row){
        res.status(403).json({message:"Invalid token"});
    }
    else{
        res.status(403).json({message:"Access denied"});
    }
    var errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data={
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,10),
    }

    var query="INSERT INTO user (username, password ) VALUES (?,?)";
    var params =[ data.username, data.password];
    db.run(query,params,function(err,row){
        if(err){
            return res.status(400).json({"error":err.message});
        }
        res.status(200).json(
            {"message":"success","data":row}
        )
    })
})


/*

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
    console.log(req.body)
    if (!req.body.password){
        errors.push("No password specified");
        return res.status(400).json({error:errors.join(",")});
    }
    if (!req.body.username){
        errors.push("No email specified");
        return res.status(400).json({error:errors.join(",")});
    }

   /* if(req.body.username.match(reg)||req.body.password.match(reg)){
        errors.push("Wrong character selection");
       
    }*/
   /* if (errors.length){
        return res.status(400).json({"error":errors.join(",")});
    }*/
    var username='';
    var query1="select * from user where username=?";
    db.get(query1,req.body.username,(err,row)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(!row){
            return res.status(401).json({error: "username non esistente"});
        }
        else if(!bcrypt.compareSync(
            req.body.password,
                row.password)){
            return res.status(401).json({error: "Wrong password"});

        }
        username=row.username;
        var token=jwt.sign(
            {
            username: username},
            "nvnrejvuerhv34ofi3vipk3202jwenclkwencnwdjcwcndv23vdwevcwec",
            {expiresIn: '900s'}
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
                        return res.status(500).json({message:err.message});
                        }

                });
            }
            else{
                let query_not_exist="INSERT INTO token(token_data,username) VALUES (?,?)";
                let params=[refresh_token,username];
                db.run(query_not_exist,params,(err)=>{
                    if(err){
                        return res.status(500).json({message:err.message});
                        }
                });
            }

        })
       res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
       res.status(200).json({message: "Login successfull",
            accessToken: token })
    });
})


router.get('/logout',(req,res)=>{
    const cookies=req.cookies;
    console.log(cookies)
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refresh_token=cookies.jwt;
    let query="Select * FROM token WHERE token_data=?";
    let params=[refresh_token];
    db.get(query,params,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        else if(!row){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
        query="DELETE FROM token WHERE token_data=?";
        params=[refresh_token];
        db.run(query,(err,row)=>{
            if(err){
                return res.status(400).json({"error":err.message});
            }
            else{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                res.sendStatus(204);
            }
        })

    })
})


router.get('/refreshToken/',(req,res)=>{
    const cookies=req.cookies;
    console.log(cookies)
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refresh_token=cookies.jwt;

    let query="Select * FROM token WHERE token_data=?";
    let params=[refresh_token];

    var username='';
    db.get(query,params,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        username=row.username;
        jwt.verify(
                refresh_token,
                "gerh7rsvrdlv4ehroqf94fojfiejwivernvjernver1vaoijfi",
                (err, decoded) => {
                    if (err || username !== decoded.username) return res.sendStatus(403);
                    var accessToken=jwt.sign(
                        {
                        username:username
                        },
                        "nvnrejvuerhv34ofi3vipk3202jwenclkwencnwdjcwcndv23vdwevcwec",//process.env.JWT_SECRET
                        {expiresIn: '900s'}
                        );
                    res.status(200).json({accessToken,username});
                }
            )
        })
    })

module.exports = router;
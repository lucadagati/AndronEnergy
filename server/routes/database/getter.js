var express = require('express');
const db = require('../../database');
var router = express.Router();


router.get('/user/:id',(req,res)=>{
    var query = "select * from user where id=?";
    var params=req.params.id
    db.get(query,params,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        res.status(200).json({"message":"success","data":row})
    });
})

router.get('/token/',(req,res)=>{
    var query = "select * from token";
    var params=req.params.id
    db.get(query,(err,row)=>{
        if(err){
            return res.status(400).json({"error":err.message});
        }
        res.status(200).json({"message":"success","data":row})
    });
})





module.exports = router;
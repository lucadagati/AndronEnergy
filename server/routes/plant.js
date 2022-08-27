var express = require('express');
var router = express.Router();


const gatewayConnectionTetstChain= async (req,res,next)=>{
    try{
        await gateway.connect(ccp,{wallet,identity:'appUser',discovery:{enabled:true,asLocalhost:true}});
        const network=await gateway.getNetwork('mychannel');
        global.contract=network.getContract('basic');
        next();
    }
    catch(error){
        console.log(error);
        await gateway.disconnect();
        res.status(500).json()
    }
}


router.post('/Add',gatewayConnectionTetstChain,async(req,res)=>{
    try {
        let control=/[.,/#!$%^&*;:{}=\-_`'"~()\s]/g;
        let char_check=/[a-zA-Z]/g;
        if(req.body.plantId===undefined || req.body.plantId.match(char_check) || !req.body.plantId.match(control)){
            return res.status(400).json({error: "Errore nell' id del plant"});
        }
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("plant:CreatePlant",JSON.stringify(req.body))).toString())
        res.status(result.status==="error" ? 400 : 200).json(result);
    } 
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({status: "error", message: error});
    }
    finally{
        await gateway.disconnect();
    }
})


router.post('/Delete',gatewayConnectionTetstChain,async(req,res)=>{
    try {
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("plant:DeletePlant",JSON.stringify(req.body))).toString())
        res.status(result.status==="error" ? 400 : 200).json(result);
    } 
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({status: "error", message: error});
    }
    finally{
        await gateway.disconnect();
    }
})



router.put('/Update/GeneratedEnergy/:id',gatewayConnectionTetstChain,async(req,res)=>{
    try {
            let result=JSON.parse(Buffer.from(await contract.submitTransaction(`plant:updateGeneratedEnergy`,req.params.id,JSON.stringify(req.body))).toString())
            res.status(result.status==="error" ? 400 : 200).json(result);
    } 
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({status: "error", message: error});
    }
    finally{
        await gateway.disconnect();
    }
})



module.exports = router;
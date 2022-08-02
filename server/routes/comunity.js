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
        console.log(JSON.stringify(req.body));
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("comunity:CreateComunity",JSON.stringify(req.body))).toString())
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


router.post('/Delete/:comunityId',gatewayConnectionTetstChain,async(req,res)=>{
    
    try {
        res.set('Access-Control-Allow-Origin', '*');
        let id=req.params.comunityId
        console.log('');
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("comunity:DeleteComunity",id)).toString())
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

router.post('/RemovePod/:comunityId/:podId',gatewayConnectionTetstChain,async(req,res)=>{
    try {
        let idPod=req.params.podId;
        let comunityId=req.params.comunityId
        console.log(idPod,comunityId);
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("comunity:DeletePodFromComunity",idPod,comunityId)).toString())
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

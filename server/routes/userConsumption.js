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
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("userConsumption:GenerateConsumption",JSON.stringify(req.body))).toString())
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

router.put('/Update/Consumption/:id',gatewayConnectionTetstChain,async(req,res)=>{
    try {
            let result=JSON.parse(Buffer.from(await contract.submitTransaction(`userConsumption:AddConsumption`,req.params.id,JSON.stringify(req.body))).toString())
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
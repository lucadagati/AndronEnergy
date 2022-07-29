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
    res.set('Access-Control-Allow-Origin', '*');
    try {
        console.log(JSON.stringify(req.body));
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("pod:CreatePod",JSON.stringify(req.body))).toString())
        res.status(200).json({
            status : 200,
            message : result
        });
    } 
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({status: "error", message: error});
    }
    finally{
        await gateway.disconnect();
    }
})

router.put('/Update/:updateElem/:id',gatewayConnectionTetstChain,async(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    try {
        console.log(req.params.id,req.body);
        console.log(JSON.stringify(req.body));
        let elem=req.params.updateElem;
        if(elem=='StoredEnergy'){
            let result=JSON.parse(Buffer.from(await contract.submitTransaction(`pod:updateStoredEnergy`,req.params.id,JSON.stringify(req.body))).toString())
            res.status(result.status==="error" ? 400 : 200).json(result);
            }
        else if(elem=='ExchangedEnergy'){
            let result=JSON.parse(Buffer.from(await contract.submitTransaction(`pod:updateExchangedEnergy`,req.params.id,JSON.stringify(req.body))).toString())
            res.status(result.status==="error" ? 400 : 200).json(result);
        }
        else if(elem=='Offgrid'){
            let result=JSON.parse(Buffer.from(await contract.submitTransaction(`pod:updateOffGrid`,req.params.id,JSON.stringify(req.body))).toString())
            res.status(result.status==="error" ? 400 : 200).json(result);
        }
    } 
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({status: "error", message: error});
    }
    finally{
        await gateway.disconnect();
    }
})


router.get('/Delete/:id',gatewayConnectionTetstChain,async(req,res)=>{
 
    try {
        res.set('Access-Control-Allow-Origin', '*');
        let elem = req.params.id;
        console.log(elem)
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("pod:DeletePod",elem)).toString())
        res.status(200).json({
                status : 200,
                message : result
            });

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

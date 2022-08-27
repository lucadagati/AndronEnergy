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
        if(req.body.podId===undefined || req.body.podId.match(char_check) || !req.body.podId.match(control)){
            return res.status(400).json({error: "Errore nell' id del pod"});
        }
        else if(req.body.cmunityId===undefined || req.body.cmunityId==="Seleziona"){
            return res.status(400).json({error: "Errore nell' id della comunità"});
        }
        else if(req.body.plantId===undefined || req.body.plantId==="Seleziona"){
            return res.status(400).json({error: "Errore nell' id del plant"});
        }

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




router.post('/removePlantfromPod',gatewayConnectionTetstChain,async(req,res)=>{
    try{       
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("pod:removePlantfromPod",JSON.stringify(req.body))).toString())
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

router.post('/updatePodPlant/',async(req,res)=>{
    try{
        console.log(JSON.stringify(req.body));
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("pod:podUpdatePlant",JSON.stringify(req.body))).toString())
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

router.post('/Delete/',gatewayConnectionTetstChain,async(req,res)=>{
 
    try {
        //let elem = req.params.id;
        console.log(req.body);
        let result= JSON.parse(Buffer.from(await contract.submitTransaction("pod:DeletePod",JSON.stringify(req.body))).toString())
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

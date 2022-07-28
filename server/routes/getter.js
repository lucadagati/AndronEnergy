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


router.get('/:asset',gatewayConnectionTetstChain,async(req,res)=>{
     res.set('Access-Control-Allow-Origin', '*');
     try{
        let asset=req.params.asset
        let result = JSON.parse(Buffer.from(await contract.submitTransaction(asset+':getAll')).toString())
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

router.get('/:asset/:id',gatewayConnectionTetstChain,async(req,res)=>{
    try{
        let asset=req.params.asset;
        let id=req.p                
        arams.id;
        let result = JSON.parse(Buffer.from(await contract.submitTransaction(asset+':get',id)).toString())
                res.status(200).json({
                status : "success",
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

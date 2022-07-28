const express= require("express");
const bodyParseer= require('body-parser');


const app= express();
app.use(bodyParseer.json());


const {Wallets,Gateway}= require('fabric-network');
const fs=require('fs');
const path=require('path');

app.use("/",require('./routes/getter'));
app.use("/podOp/",require('./routes/pod'));
app.use('/plantOp/',require('./routes/plant'));
app.use('/userConsumptionOp/',require('./routes/userConsumption'));
app.use('/comunityOp/',require('./routes/comunity'))

app.listen(8060,async()=>{
    const ccpPath=path.resolve(__dirname,'..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
    global.ccp=JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    global.gateway=new Gateway();
    const walletPath = path.join(process.cwd(),'/wallet');
    global.wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log("API running on http://localhost:8060");
    
})

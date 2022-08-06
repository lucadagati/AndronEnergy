const express= require("express");
const bodyParseer= require('body-parser');
const cors = require("cors");
const verifyToken=require("./routes/database/verifyToken");
const app= express();
const cookieParser = require('cookie-parser');
const user = require('./routes/database/user');


app.use(bodyParseer.json());
app.use(cookieParser());
app.use(cors())

const {Wallets,Gateway}= require('fabric-network');
const fs=require('fs');
const path=require('path');

app.use(express.urlencoded({ extended: false }));
app.use('/admin/',user);

app.use(verifyToken);//Tutte le route successive sono sotto il verify token
app.use("/",require('./routes/getter'));
app.use("/podOp/",require('./routes/pod'));
app.use('/plantOp/',require('./routes/plant'));
app.use('/userConsumptionOp/',require('./routes/userConsumption'));
app.use('/comunityOp/',require('./routes/comunity'))
app.use('/admin/',require('./routes/database/user'))
//app.use('/us/',require('./routes/database/getter'))

app.listen(8060,async()=>{
    const ccpPath=path.resolve(__dirname,'..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
    global.ccp=JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    global.gateway=new Gateway();
    const walletPath = path.join(process.cwd(),'/wallet');
    global.wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log("API running on http://localhost:8060");
    
})

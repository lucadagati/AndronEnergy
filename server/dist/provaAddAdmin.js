"use strict";
/*import { Wallets, X509Identity } from 'fabric-network';
import * as FabricCAServices from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';



async function main(){
    try{
        const ccpPath=path.resolve(__dirname,'..','..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
        const ccp=JSON.parse(fs.readFileSync(ccpPath,'utf8'));
        const caInfo=ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        const walletPath= path.join(process.cwd(),'../wallet');
        const wallet= await Wallets.newFileSystemWallet(walletPath);
        console.log("Wallet is: "+walletPath);

        const identity= await wallet.get('admin');
        if(identity){
            console.log("The user identity admin altready exists");
            return;
        }
        const enrollment= await ca.enroll({enrollmentID:'admin',
            enrollmentSecret:'adminpw'});
        const X509Identity:X509Identity={
            credentials:{
                certificate:enrollment.certificate,
                privateKey:enrollment.key.toBytes()
            },
            mspId:'Org1MSP',
            type:'X.509'
        };
        await wallet.put('admin',X509Identity);
        console.log("Admin enrolled and imported into the wallet");
    }catch(error){
        console.error('Failed to enroll admin:'+error);
        process.exit(1);
    }
}

main();*/
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FabricCAServices = require("fabric-ca-client");
const fabric_network_1 = require("fabric-network");
const fs = require("fs");
const path = require("path");
async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = await fabric_network_1.Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
    }
    catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=provaAddAdmin.js.map
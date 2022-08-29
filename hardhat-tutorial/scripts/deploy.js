const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verfiy");

async function main() {
   const { network } = hre;
   const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/";
   console.log(`Network selected : ${network.name}`);
   console.log(`Chain Id : ${network.config.chainId}`);

   console.log(`================================================================`);
   console.log(`Deploying LW3Punks Contract...`);
   const LW3PunksContract = await ethers.getContractFactory("LW3Punks");
   const lw3PunksContractTx = await LW3PunksContract.deploy(metadataURL);
   console.log(`Waiting for 6 block Confirmation`);
   await lw3PunksContractTx.deployTransaction.wait(6);
   console.log(`LW3Punks Contract Deployed @ address : ${lw3PunksContractTx.address}`);

   console.log("Sleeping for 10 Seconds.....");
   await sleep(10000);

   let args = [metadataURL];
   if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_KEY) {
      console.log(`Verifying LW3Punks Contract Deployed @ address : ${lw3PunksContractTx.address}`);
      await verify(lw3PunksContractTx.address, args);
      console.log(`Verified LW3Punks Contract Deployed`);
   }
   console.log(`================================================================`);
}

function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});

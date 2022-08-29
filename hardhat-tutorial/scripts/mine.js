const { network } = require("hardhat");
const { moveBlocks } = require("../utils/moveBlocks");

const BLOCKS = 6;
const SLEEP_AMOUNT = 1000;

const mine = async () => {
  //   if (network.config.chainId == 1337) {
  await moveBlocks(BLOCKS, (sleepAmount = SLEEP_AMOUNT));
  //   }
};

mine()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

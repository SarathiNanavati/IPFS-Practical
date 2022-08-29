////

const { network } = require("hardhat");

const sleep = (timeInMilliSeconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeInMilliSeconds);
    });
};

const moveBlocks = async (amount, sleepAmount = 0) => {
    console.log("Moving Blocks");

    for (let index = 0; index < amount; index++) {
        if (sleepAmount > 0) {
            console.log(`Sleeping for ${sleepAmount}`);
            await sleep(sleepAmount);
        }
        await network.provider.request({
            method: "evm_mine",
            params: [],
        });
    }
};

module.exports = {
    moveBlocks,
    sleep,
};

require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks:{
    hardhat:{
    },
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/8jogfWIV7RMCP7lkBP-bVMakOh-vu9Ds",
      accounts: ["6ff516650583f5360632fbdee7ec8260ae0268d4114cab20d3ffe76877df15d0"]
    }
  }
};

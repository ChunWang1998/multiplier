require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "blast",
  networks: {
    blast: {
      url: `https://go.getblock.io/` + process.env.GETBLOCK_INFURA_API_KEY,
      accounts: [process.env.METAMASK_ACCOUNT_PRIVATE_KEY],
    },
  },
};

const hre = require("hardhat");

const gameFiAddress = "0xfa8bd89d03ea8b9ec56876444971bb9759fcdd8f";
const gameFiABI = [
  {
    inputs: [],
    name: "ethDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const launchpadAddress = "0x62D4Fa81f3c511516dBbDcdb9fDf1e49bc3ec22D";
const launchpadABI = [
  {
    inputs: [
      {
        internalType: "contract BlazeType",
        name: "_blazeType",
        type: "address",
      },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mintBlazeType",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const lendingAddress = "0x44f33bC796f7d3df55040cd3C631628B560715C2";
const lendingABI = [
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "deposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function init() {
  let [signer] = await hre.ethers.getSigners();

  try {
    const gameFiContract = new hre.ethers.Contract(
      gameFiAddress,
      gameFiABI,
      signer,
    );
    await gameFiContract.ethDeposit({
      value: hre.ethers.parseEther("0.0"),
    });

    const launchpadContract = new hre.ethers.Contract(
      launchpadAddress,
      launchpadABI,
      signer,
    );
    await launchpadContract.mintBlazeType(
      "0x81145673461dE1F059951348C677c98da1C06D8c",
      1,
      {
        value: hre.ethers.parseEther("0.0005"),
      },
    );

    const lendingContract = new hre.ethers.Contract(
      lendingAddress,
      lendingABI,
      signer,
    );
    await lendingContract.deposit(0);
  } catch (error) {
    console.error("Error fetching value:", error.message);
  }
}

(async () => {
  await init();
})();

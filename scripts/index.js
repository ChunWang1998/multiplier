const hre = require("hardhat");

const contractAddress = "0x51aad5867d73c479ce8c59ae9c9e4bf59d74c4c1";

const contractABI = [
  {
    inputs: [],
    name: "claimYield",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_minClaimRateBips", type: "uint256" },
    ],
    name: "claimGasFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimableYield",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_quantity", type: "uint256" },
      { internalType: "address", name: "_collection", type: "address" },
    ],
    name: "boost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_quantity", type: "uint256" },
      { internalType: "address", name: "_collectionFrom", type: "address" },
      { internalType: "address", name: "_collectionTo", type: "address" },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_collection", type: "address" }],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const TEST_NFT_COLLECTION = "0xF9D68FA74F506697Ef70F6E1E09A75BC2394E662";
let quantity = 1;

async function init() {
  let [signer] = await hre.ethers.getSigners();

  const contract = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  );
    
  try {
    await contract.boost(quantity, TEST_NFT_COLLECTION, {
      value: hre.ethers.parseEther("0.01"),
    });

    await contract.refund(TEST_NFT_COLLECTION);
  } catch (error) {
    console.error("Error fetching value:", error.message);
  }
}

(async () => {
  await init();
})();

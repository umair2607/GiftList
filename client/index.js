const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);
const name = "Edmond Carroll PhD";
const index = niceList.findIndex((n) => n === name);
const proof = merkleTree.getProof(index);

async function main() {
  if (index) {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      name,
    });
    console.log(gift);
  } else {
    console.log("Sorry you are not in the list");
  }
}
main();

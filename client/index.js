const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const name = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  if (index) {
    const proof = merkleTree.getProof(index);
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      name,
      root,
    });
    console.log({ gift });
  } else {
    console.log("Sorry you are not in the list");
  }
}
main();

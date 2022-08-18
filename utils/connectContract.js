import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x16D7cAB0B95D8A1812bE7aa2940c0001474c7211";
  const contractABI = abiJSON.abi;
  let rsvpContract;

  try {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const sigber = provider.getSigner();
    rsvpContract = new ethers.Contract(contractAddress, contractABI, sigber);

    if (!ethereum) {
      console.log("Ethereum object doesn't exist");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return rsvpContract;
}

export default connectContract;

import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x464a07a0fB49C42E47D04fAb9a63943BDCDe9989";
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

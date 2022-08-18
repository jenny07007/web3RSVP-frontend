import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x86798d822372BF8bD37947756AA24F1a3Ffb6aCc";
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

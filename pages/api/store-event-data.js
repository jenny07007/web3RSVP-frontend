import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await storeEventData(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

// get data from request
// return cid that points to an IPFS directory of the file we just stored
async function storeEventData(req, res) {
  const body = req.body;
  try {
    const files = await makeFileObjects(body);
    const cid = await storeFiles(files);
    return res.status(200).json({ cid, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating event", success: false });
  }
}

//  upload files
async function makeFileObjects(body) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd());
  const files = await getFilesFromPath(imageDirectory);

  files.push(new File([buffer], "data.json"));
  return files;
}

// make a storage client object
function makeStorageClient() {
  return new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN,
  });
}

// the cid will be stored on-chain and be used to retrieve our files
async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

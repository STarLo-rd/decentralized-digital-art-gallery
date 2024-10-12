import { create } from 'ipfs-http-client';
import { encode } from 'js-base64';

const projectId = import.meta.env.VITE_INFURA_PROJECT_ID;
const projectSecret = import.meta.env.VITE_INFURA_PROJECT_SECRET;
const auth = 'Basic ' + encode(projectId + ':' + projectSecret);

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const added = await client.add(file);
    const url = `https://ipfs.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (json: object): Promise<string> => {
  try {
    const added = await client.add(JSON.stringify(json));
    const url = `https://ipfs.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};
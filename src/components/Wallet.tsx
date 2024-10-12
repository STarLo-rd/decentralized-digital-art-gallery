import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const SimpleStorageABI: AbiItem[] = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "num","type": "uint256"}],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const SimpleStorageAddress = '0x...'; // Replace with your deployed contract address

const Wallet: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [storedValue, setStoredValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const balance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(web3Instance.utils.fromWei(balance, 'ether'));
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const loadStoredValue = async () => {
      if (web3) {
        const contract = new web3.eth.Contract(SimpleStorageABI, SimpleStorageAddress);
        const value = await contract.methods.retrieve().call();
        setStoredValue(value);
      }
    };

    loadStoredValue();
  }, [web3]);

  const handleStore = async () => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(SimpleStorageABI, SimpleStorageAddress);
      try {
        await contract.methods.store(newValue).send({ from: account });
        const updatedValue = await contract.methods.retrieve().call();
        setStoredValue(updatedValue);
        setNewValue('');
      } catch (error) {
        console.error("Error storing value:", error);
      }
    }
  };

  const handleSendTransaction = async () => {
    if (web3 && account) {
      try {
        const amount = web3.utils.toWei('0.01', 'ether'); // Sending 0.01 ETH
        await web3.eth.sendTransaction({
          from: account,
          to: '0x...', // Replace with recipient address
          value: amount
        });
        const newBalance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(newBalance, 'ether'));
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Wallet & Blockchain Interaction</h2>
      {account ? (
        <div>
          <p className="mb-2"><strong>Account:</strong> {account}</p>
          <p className="mb-4"><strong>Balance:</strong> {balance} ETH</p>
          <button
            onClick={handleSendTransaction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Send 0.01 ETH
          </button>
          <div className="mb-4">
            <p><strong>Stored Value:</strong> {storedValue}</p>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="border rounded p-2 mr-2"
              placeholder="New value"
            />
            <button
              onClick={handleStore}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Store Value
            </button>
          </div>
        </div>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
    </div>
  );
};

export default Wallet;
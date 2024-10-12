import React from 'react';
import { Link } from 'react-router-dom';
import Wallet from '../components/Wallet';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to DecentralArt</h1>
      <p className="text-xl mb-8">Discover, collect, and sell extraordinary NFTs</p>
      <div className="flex justify-center space-x-4 mb-8">
        <Link to="/gallery" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Explore Gallery
        </Link>
        <Link to="/mint" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Mint NFT
        </Link>
      </div>
      <Wallet />
    </div>
  );
};

export default Home;
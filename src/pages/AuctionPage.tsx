import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface NFT {
  id: number;
  title: string;
  artist: string;
  image: string;
  description: string;
  currentBid: number;
  endTime: string;
}

const AuctionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nft, setNFT] = useState<NFT | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, fetch NFT details from API or smart contract
    const mockNFTDetails: NFT = {
      id: parseInt(id || '1'),
      title: 'Abstract Harmony',
      artist: 'Alice',
      image: 'https://source.unsplash.com/random/800x600?abstract',
      description: 'A mesmerizing digital artwork that explores the interplay of colors and shapes in the abstract realm.',
      currentBid: 0.5,
      endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    };
    setNFT(mockNFTDetails);
  }, [id]);

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nft) return;

    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= nft.currentBid) {
      setError('Bid must be higher than the current bid');
      return;
    }

    // In a real app, this would interact with a smart contract
    setNFT({ ...nft, currentBid: bidValue });
    setBidAmount('');
    setError('');
    alert(`Bid of ${bidValue} ETH placed successfully!`);
  };

  if (!nft) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={nft.image} alt={nft.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{nft.title}</h2>
          <p className="text-gray-600 mb-4">Artist: {nft.artist}</p>
          <p className="mb-4">{nft.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold">Current Bid: {nft.currentBid} ETH</p>
            <p>Auction ends: {new Date(nft.endTime).toLocaleString()}</p>
          </div>
          <form onSubmit={handleBid} className="space-y-4">
            <div>
              <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">Your Bid (ETH)</label>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={nft.currentBid + 0.1}
                step="0.1"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Place Bid
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
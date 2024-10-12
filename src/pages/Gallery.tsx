import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NFT {
  id: number;
  title: string;
  artist: string;
  image: string;
}

const Gallery: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // In a real app, replace this with an actual API call
        const response = await new Promise<NFT[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, title: 'Abstract Harmony', artist: 'Alice', image: 'https://source.unsplash.com/random/400x400?abstract' },
              { id: 2, title: 'Digital Landscape', artist: 'Bob', image: 'https://source.unsplash.com/random/400x400?landscape' },
              { id: 3, title: 'Crypto Punk', artist: 'Charlie', image: 'https://source.unsplash.com/random/400x400?punk' },
              { id: 4, title: 'Neon Dreams', artist: 'Diana', image: 'https://source.unsplash.com/random/400x400?neon' },
            ]);
          }, 1000);
        });
        setNfts(response);
      } catch (err) {
        setError('Failed to fetch NFTs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">NFT Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{nft.title}</h3>
              <p className="text-gray-600 mb-4">Artist: {nft.artist}</p>
              <Link to={`/auction/${nft.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                View Auction
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
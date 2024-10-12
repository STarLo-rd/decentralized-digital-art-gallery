import React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Palette className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-800">DecentralArt</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link></li>
            <li><Link to="/gallery" className="text-gray-600 hover:text-indigo-600">Gallery</Link></li>
            <li><Link to="/mint" className="text-gray-600 hover:text-indigo-600">Mint NFT</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
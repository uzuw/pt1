import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => { //for react functional components
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center w-full px-6 py-4 shadow-md bg-white">
      <div className="flex gap-8 items-center">
        <Link to="/add"><AddIcon className="text-gray-700 hover:text-blue-600 transition" /></Link>
        <Link to="/"><HomeFilledIcon className="text-gray-700 hover:text-blue-600 transition" /></Link>
        <Link to="/projects"><AppsIcon className="text-gray-700 hover:text-blue-600 transition" /></Link>
        <Link to="/history"><HistoryIcon className="text-gray-700 hover:text-blue-600 transition" /></Link>
      </div>

      <div className="relative">
        <AccountCircleIcon
          className="text-gray-700 hover:text-blue-600 cursor-pointer"
          fontSize="large"
          onClick={() => setShowDropdown(prev => !prev)}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
            Profile
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

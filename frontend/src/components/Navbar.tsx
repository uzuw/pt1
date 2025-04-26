import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profile from './profile/Profile';

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[50%] bg-white rounded-3xl shadow-lg px-8 py-3 flex items-center justify-between z-30">
      {/* Left side: Navigation icons */}
      <div className="flex gap-10 items-center">
        <Link to="/add">
          <div className="p-2 bg-gray-50 text-gray-700 rounded-full shadow hover:bg-gray-700 hover:text-white transition transform hover:scale-110">
            <AddIcon fontSize="large" />
          </div>
        </Link>

        <Link to="/">
          <HomeFilledIcon className="text-gray-700 hover:text-purple-900 hover:scale-110 transition" fontSize="large" />
        </Link>

        <Link to="/projects">
          <AppsIcon className="text-gray-700 hover:text-purple-900 hover:scale-110 transition" fontSize="large" />
        </Link>

        <Link to="/history">
          <HistoryIcon className="text-gray-700 hover:text-purple-900 hover:scale-110 transition" fontSize="large" />
        </Link>
      </div>

      {/* Right side: Profile */}
      <div className="relative">
        <AccountCircleIcon
          className="text-gray-700 hover:text-black hover:scale-110 cursor-pointer"
          fontSize="large"
          onClick={() => setShowDropdown(prev => !prev)}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
            <Profile />
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

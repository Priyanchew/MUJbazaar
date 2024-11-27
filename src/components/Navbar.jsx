import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../firebase.config';

import { ReactComponent as MenuIcon } from '../assets/svg/menu.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { ReactComponent as DefaultProfileIcon } from '../assets/svg/profile-user.svg';

function Navbar({ loggedIn }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu') && !e.target.closest('.profile-icon')) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const logOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="ml-auto relative flex items-center justify-end gap-2 xl:gap-6">
      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        onClick={toggleNav}
        className="btn btn-ghost border border-gray-200 xl:hidden">
        {isNavOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isNavOpen && (
        <ul className="navbar-dropdown xl:hidden absolute top-full right-0 w-64 z-50 py-4 bg-white shadow-lg rounded-md border border-gray-200 mt-2">
          <li>
            <Link to="/category/sale" className="px-4 py-2 block hover:bg-gray-100">
              Buy
            </Link>
          </li>
          <li>
            <Link to="/category/rent" className="px-4 py-2 block hover:bg-gray-100">
              Rent
            </Link>
          </li>
          {loggedIn && (
            <>
              <li>
                <Link to="/profile" className="px-4 py-2 block hover:bg-gray-100">
                  View Profile
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="px-4 py-2 block hover:bg-gray-100">
                  Create Listing
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="px-4 py-2 block hover:bg-gray-100">
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="px-4 py-2 block hover:bg-gray-100">
                  Saved Listings
                </Link>
              </li>
              <li>
                <Link to="/messages" className="px-4 py-2 block hover:bg-gray-100">
                  Messages
                </Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  type="button"
                  className="px-4 py-2 block text-left hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </>
          )}
          {!loggedIn && (
            <>
              <li>
                <Link to="/login" className="px-4 py-2 block hover:bg-gray-100">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="px-4 py-2 block hover:bg-gray-100">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}

      {/* Desktop Navigation Links */}
      <ul className="hidden xl:flex xl:items-center xl:gap-6">
        <li>
          <Link to="/category/sale" className="nav-link">
            Buy
          </Link>
        </li>
        <li>
          <Link to="/category/rent" className="nav-link">
            Rent
          </Link>
        </li>
        <li>
          <Link to="/create-listing" className="nav-link">
            Sell
          </Link>
        </li>
      </ul>

      {/* Profile Icon with Dropdown - Only for Desktop */}
      {loggedIn && (
        <div className="relative hidden xl:block">
          <DefaultProfileIcon
            type="button"
            onClick={toggleProfileMenu}
            className="profile-icon flex items-center justify-center w-10 h-9 rounded-full bg-gray-200 text-gray-600"
          />
          {isProfileMenuOpen && (
            <ul className="profile-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  View Profile
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="block px-4 py-2 hover:bg-gray-100">
                  Create Listing
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-100">
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="block px-4 py-2 hover:bg-gray-100">
                  Saved Listings
                </Link>
              </li>
              <li>
                <Link to="/messages" className="block px-4 py-2 hover:bg-gray-100">
                  Messages
                </Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  type="button"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

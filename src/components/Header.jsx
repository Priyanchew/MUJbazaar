import { Link } from 'react-router-dom';

import Navbar from './Navbar';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase.config';

import logo from '../assets/images/MUJbazaar.png';

function Header() {
  const [user, loading] = useAuthState(auth);

  return (
    <header className="px-3">
      <div className="w-full max-w-8xl mx-auto flex items-center py-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-90">
          <img src={logo} alt="Flowbite Logo" className="h-10" />
        </Link>
        {!loading && <Navbar loggedIn={!!user} />}
      </div>
    </header>
  );
}

export default Header;

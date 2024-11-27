import { ReactComponent as GithubLogo } from '../assets/svg/github.svg';
import logo from '../assets/images/MUJbazaarlogo2.png';

function Footer() {
  return (
    <footer className="bg-gray-900 shadow mt-4">
      <div className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Flowbite Logo" className="h-12" />
        </div>
        <ul className="flex flex-wrap items-center mt-4 text-sm text-white md:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-gray-700 mt-4">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-white">
          © 2024{' '}
          <a href="#" className="hover:underline">
            MUJbazaar
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

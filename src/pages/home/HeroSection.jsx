import { Link } from 'react-router-dom';
import collegeimage from '../../assets/images/1.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.config';

function HeroSection() {
  const [user] = useAuthState(auth);
  return (
    <section
      className="relative overflow-hidden bg-gray-900 text-gray-300 min-h-[40rem] flex items-center justify-center"
      style={{ backgroundImage: `url(${collegeimage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="relative w-full max-w-7xl text-center py-14 px-3">
        <h1 className="text-white text-6xl lg:text-7xl font-extrabold mb-4">
          Buy or Rent, Right Around Campus!
        </h1>
        <p className="leading-loose mb-10 max-w-2xl mx-auto text-gray-300">
          Find the best deals for books, appliances, furniture, and more—all from fellow students and locals. Save money and shop conveniently within your college community.
        </p>
        {!user && ( // Conditionally render buttons if not logged in
          <div className="flex items-center justify-center flex-wrap gap-4">
            <Link
              to="/login"
              className="btn bg-white text-gray-900 hover:bg-gray-200 flex-shrink-0 w-[160px]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary flex-shrink-0 w-[160px]"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;

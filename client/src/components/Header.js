import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <div className="navbar mb-8 shadow-lg bg-neutral-focus text-neutral-content rounded-box w-full sticky top-2 z-50 max-w-4xl mx-auto">
      <Link to="/" className="px-2 mx-2 navbar-start">
        <span className="text-lg font-bold">Logo</span>
      </Link>
      <div className="flex px-2 mx-2 navbar-center">
        <div className="flex items-stretch">
          <Link to="dashboard">
            <span className="btn btn-ghost btn-sm rounded-btn">Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;

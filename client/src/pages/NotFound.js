import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="card shadow-2xl  bg-primary text-primary-content">
        <div className="card-body">
          <h6 className="mb-2 text-2xl font-bold text-center md:text-3xl">Oops! Page not found</h6>
          <p className="text-center text-gray-200 md:text-lg">The page you’re looking for doesn’t exist.</p>
          <div className="justify-center card-actions">
            <Link to="/">
              <button className="btn btn-primary">← Go home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

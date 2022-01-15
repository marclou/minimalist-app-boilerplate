import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You need to log in first');
    }
  }, []);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

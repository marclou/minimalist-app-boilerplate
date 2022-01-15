import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logout } from '../state/auth';
import userService from '../services/users';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { isLoggedIn, user, tokens } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    userService.getUsers().then(
      (response) => {
        setUsers(response.data.results);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoading(true);

    dispatch(logout({ refreshToken: tokens.refresh.token }))
      .unwrap()
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  return (
    <div className="card shadow-lg bg-base-100 max-w-2xl mx-auto text-center ">
      <div className="card-body">
        <h2 className="card-title">
          Welcome <span className="text-accent">{user.name}</span>
        </h2>

        <p>{user.email}</p>

        <p>
          Access token expires <span className="font-bold">{new Date(tokens.access.expires).toLocaleString()}</span>
        </p>

        <div className="overflow-x-auto pt-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <th>{user.name}</th>
                  <th>{user.id.slice(0, 12)}...</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="justify-center card-actions">
          <button className={`btn btn-outline btn-secondary btn-sm ${isLoading && 'loading'}`} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

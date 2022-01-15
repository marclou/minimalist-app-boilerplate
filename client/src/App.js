import { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { refreshTokens } from './state/auth';
import { Layout } from './components';
import Home from './pages/Home';
import Loader from './pages/Loader';

const NotFound = lazy(() => import('./pages/NotFound'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const PasswordForgot = lazy(() => import('./pages/PasswordForgot'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, tokens } = useSelector((state) => state.auth);
  const [accessTokenHasExpired, setAccessTokenHasExpired] = useState(
    !isLoggedIn && tokens && new Date(tokens.refresh.expires) > Date.now()
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshTokens({ refreshToken: tokens.refresh.token }));
    } else if (accessTokenHasExpired) {
      dispatch(refreshTokens({ refreshToken: tokens.refresh.token }))
        .unwrap()
        .finally(() => setAccessTokenHasExpired(false));
    }
  }, []);

  return accessTokenHasExpired ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<PasswordForgot />} />
          <Route path="reset-password" element={<PasswordReset />} />

          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

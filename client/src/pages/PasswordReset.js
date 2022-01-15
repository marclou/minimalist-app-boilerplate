import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import config from '../config';
import authService from '../services/auth';
import { usePasswordToggle } from '../hooks/usePasswordToggle';

function PasswordForgot() {
  const [token, setToken] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInQuery = searchParams.get('token');

    if (!tokenInQuery) {
      toast.error('Oops... The link you followed is not valid');
      setHasError(true);
    } else {
      setToken(tokenInQuery);

      // remove token from url to prevent http referer leakage
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        'Password must contain at least 8 characters, one letter, and one number'
      )
      .required('This field is required!'),
  });

  const handleSubmit = async (formValue) => {
    const { password } = formValue;

    setIsLoading(true);

    try {
      await authService.resetPassword(token, password);

      toast('New password set up 👍\nPlease log in to your account now.');

      navigate('/login', { replace: true });
    } catch (error) {
      setIsLoading(false);

      setHasError(true);

      toast.error(error.message);
    }
  };

  return (
    <div className="card shadow-lg bg-base-100 max-w-2xl mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-body">
              <h2 className="my-4 text-4xl font-bold card-title">Choose your new password</h2>

              {/* For accessibility purposes */}
              <input type="text" name="email" autoComplete="username" style={{ display: 'none' }} />

              <div className="form-group">
                <label className="label" htmlFor="password">
                  <span className="label-text">New password</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Field
                    disabled={!token}
                    name="password"
                    type={PasswordInputType}
                    autoComplete="new-password"
                    className={`form-control w-full input input-bordered ${
                      errors.password && touched.password ? ' input-error' : ''
                    }`}
                  />
                  {token && <span className="password-toggle-icon">{ToggleIcon}</span>}
                </div>
                <label className="label">
                  <ErrorMessage name="password" component="span" className="label-text-alt" />
                </label>
              </div>

              <div className="form-group py-4">
                <button type="submit" className={`btn btn-primary btn-block ${isLoading && 'loading'}`} disabled={!token}>
                  Update Password
                </button>

                {hasError && (
                  <div className="text-center mt-4">
                    <a href={`mailto:${config.emailSupport}`} target="_blank" className="link" rel="noreferrer">
                      Need help?
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PasswordForgot;

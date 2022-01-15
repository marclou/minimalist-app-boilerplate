import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { login } from '../state/auth';
import { usePasswordToggle } from '../hooks/usePasswordToggle';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        'Password must contain at least 8 characters, one letter, and one number'
      )
      .required('This field is required!'),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    setIsLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        navigate('/dashboard');
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  return (
    <div className="card shadow-lg bg-base-100 max-w-2xl mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-body">
              <h2 className="my-4 text-4xl font-bold card-title">Log in to your account</h2>

              <div className="form-group">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <Field
                  name="email"
                  type="text"
                  autoComplete="username"
                  className={`form-control w-full input input-bordered ${
                    errors.email && touched.email ? ' input-error' : ''
                  }`}
                  placeholder="chuck@norris.com"
                />
                <label className="label">
                  <ErrorMessage name="email" component="span" className="label-text-alt" />
                </label>
              </div>

              <div className="form-group">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                  <Link to="/forgot-password" className="label-text-alt">
                    Forgotten password?
                  </Link>
                </label>
                <div style={{ position: 'relative' }}>
                  <Field
                    name="password"
                    type={PasswordInputType}
                    autoComplete="current-password"
                    className={`form-control w-full input input-bordered ${
                      errors.password && touched.password ? ' input-error' : ''
                    }`}
                  />
                  <span className="password-toggle-icon">{ToggleIcon}</span>
                </div>
                <label className="label">
                  <ErrorMessage name="password" component="span" className="label-text-alt" />
                </label>
              </div>

              <div className="form-group py-4">
                <button type="submit" className={`btn btn-primary btn-block ${isLoading && 'loading'}`}>
                  Log in
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-md" />
                </button>
                <div className="text-center mt-4">
                  Don't have an account?{' '}
                  <Link to="/signup" className="link">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

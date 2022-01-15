import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { register } from '../state/auth';
import { usePasswordToggle } from '../hooks/usePasswordToggle';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        'len',
        'The name must be between 2 and 20 characters.',
        (val) => val && val.toString().length >= 2 && val.toString().length <= 20
      )
      .required('This field is required!'),
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        'Password must contain at least 8 characters, one letter, and one number'
      )
      .required('This field is required!'),
  });

  const handleSignup = (formValue) => {
    const { name, email, password } = formValue;

    setIsLoading(true);

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        toast(`Welcome, ${name} 👋`);
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  return (
    <div className="card shadow-lg bg-base-100 max-w-2xl mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignup}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-body">
              <h2 className="my-4 text-4xl font-bold card-title">Create your account</h2>

              <div className="form-group">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <Field
                  name="name"
                  type="text"
                  className={`form-control w-full input input-bordered ${errors.name && touched.name ? ' input-error' : ''}`}
                  placeholder="Chuck Norris"
                />
                <label className="label">
                  <ErrorMessage name="name" component="span" className="label-text-alt" />
                </label>
              </div>

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
                </label>
                <div style={{ position: 'relative' }}>
                  <Field
                    name="password"
                    type={PasswordInputType}
                    autoComplete="new-password"
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
                  Sign Up <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-md" />
                </button>
                <div className="text-center mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="link">
                    Log in
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

export default Signup;

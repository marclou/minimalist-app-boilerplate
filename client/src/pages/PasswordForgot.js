import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import authService from '../services/auth';

function PasswordForgot() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentLink, setHasSentLink] = useState(false);
  const submitRef = useRef();

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
  });

  const handleSubmit = async (formValue) => {
    const { email } = formValue;

    setIsLoading(true);

    try {
      await authService.forgotPassword(email);

      setHasSentLink(true);

      toast.success(`Link sent! Check your email (and spam) for password reset instructions`, {
        autoClose: false,
      });

      if (submitRef.current) {
        submitRef.current.style.border = 0;
        submitRef.current.style.backgroundColor = 'hsla(var(--n) / var(--tw-bg-opacity, 1))';
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow-lg bg-base-100 max-w-2xl mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-body">
              <h2 className="my-4 text-4xl font-bold card-title">Reset your password</h2>

              <div className="mb-4">Please enter your email address to get a link to reset your password.</div>

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

              <div className="form-group py-4">
                <button
                  type="submit"
                  className={`btn btn-primary btn-block ${isLoading && 'loading'}`}
                  disabled={hasSentLink}
                  ref={submitRef}
                >
                  {hasSentLink ? 'Link sent!' : 'Send reset link'}
                </button>

                <div className="text-center mt-4">
                  Changed your mind?{' '}
                  <Link to="/login" className="link">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PasswordForgot;

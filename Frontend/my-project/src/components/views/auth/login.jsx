// here i will create a login page 

// LoginForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import { useNavigate, Link } from 'react-router-dom'; 

const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        branch
        email
        phone
        hostelOrRoomNo
        username
        year
      }
    }
  }
`;

// Define Yup schema for form validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();

  // Apollo Client useMutation hook to execute the login mutation
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Execute Apollo mutation here
          loginUser({
            variables: {
              input: {
                email: values.email,
                password: values.password,
              }
            },
          }).then(({ data }) => {
            console.log('Login successful!', data);
            localStorage.setItem('token', data.login.token); // Store the token in local storage
            navigate('/GetBooks');
          }).catch((error) => {
            console.error('Error logging in:', error);
            // Handle login error (e.g., display error message)
          }).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {error && <div className="text-red-500 text-xs mt-1">Login failed. Please check your credentials.</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

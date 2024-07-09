// this is the sign up page of the applicatioon 

// SignupForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  image: Yup.string(),
  year: Yup.number().required('Year is required'),
  hostelOrRoomNo: Yup.string().required('Hostel/Room No. is required'),
  branch: Yup.string().required('Branch is required'),
});

const SignupForm = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          image: '',
          year: '',
          hostelOrRoomNo: '',
          branch: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <Field
                type="text"
                id="image"
                name="image"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <Field
                type="number"
                id="year"
                name="year"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="year" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="hostelOrRoomNo" className="block text-sm font-medium text-gray-700">Hostel/Room No.</label>
              <Field
                type="text"
                id="hostelOrRoomNo"
                name="hostelOrRoomNo"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="hostelOrRoomNo" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <Field
                type="text"
                id="branch"
                name="branch"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="branch" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;

// so i am going to create a user form using formik and yup they both are front end libraries use to create form for validation

/*
Formik is a library that helps you handle form state and form submission in React.

Yup is a validation library that allows you to define validation schema to validate form inputs. 
Together, Formik and Yup make form validation in React a breeze.

 */

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, gql } from '@apollo/client';
import 'tailwindcss/tailwind.css';
import { FormSchema } from './yupSchema';

// GraphQL mutation
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      username
      email
      image
      year
      hostelOrRoomNo
      branch
    }
  }
`;



const FormikForm = () => {
  const [formData, setFormData] = useState({});
  const [createUser] = useMutation(CREATE_USER);

  return (
    <div className="max-w-md mx-auto mt-10">
      <Formik
        validationSchema={FormSchema}
        initialValues={{
          name: '',
          email: '',
          image: '',
          year: '',
          hostelOrRoom: '',
          branch: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          createUser({ variables: { input: values } })
            .then(response => {
              console.log('User created:', response.data.createUser);
              setFormData(response.data.createUser);
            })
            .catch(error => {
              console.error('Error creating user:', error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <Field
                type="text"
                name="image"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="image" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <Field
                type="text"
                name="year"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="year" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="hostelOrRoom" className="block text-sm font-medium text-gray-700">Hostel or Room Number</label>
              <Field
                type="text"
                name="hostelOrRoom"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="hostelOrRoom" component="div" className="text-red-600 text-sm" />
            </div>
x
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <Field
                type="text"
                name="branch"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="branch" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;

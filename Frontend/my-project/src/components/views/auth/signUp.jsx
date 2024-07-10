// this is the sign up page of the applicatioon

// SignupForm.js
// SignupForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation Mutation($input: SignupInput!) {
    signup(input: $input) {
      user {
        _id
        branch
        email
        hostelOrRoomNo
        username
        year
        phone
      }
      token
    }
  }
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  year: Yup.number().required("Year is required"),
  hostelOrRoomNo: Yup.string().required("Hostel/Room No. is required"),
  branch: Yup.string().required("Branch is required"),
  phone: Yup.string(),
});

const SignupForm = () => {
  const [signup, { error, loading }] = useMutation(SIGN_UP);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Account
      </h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          year: "",
          hostelOrRoomNo: "",
          branch: "",
          phone: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            const input = { ...values };
            const { data } = await signup({ variables: { input } });
            alert("Account created successfully!");
            
            console.log(data.signup.token);
            console.log(data.signup.user);
          } catch (err) {
            console.error(err);
            alert("Error creating account");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username (optional)
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <Field
                  type="number"
                  id="year"
                  name="year"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="hostelOrRoomNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hostel/Room No.
                </label>
                <Field
                  type="text"
                  id="hostelOrRoomNo"
                  name="hostelOrRoomNo"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="hostelOrRoomNo"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Branch
                </label>
                <Field
                  type="text"
                  id="branch"
                  name="branch"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="branch"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone (optional)
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting || loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {error && (
              <div className="text-red-600 text-sm mt-2">{error.message}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;

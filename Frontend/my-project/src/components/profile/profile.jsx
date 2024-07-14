// JWT tokens are base64-encoded strings with three parts: header, payload, and signature. You can use the atob function to decode the base64 string.
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
      phone
      year
      hostelOrRoomNo
      branch
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      _id
      username
      email
      phone
      year
      hostelOrRoomNo
      branch
    }
  }
`;

// Function to decode the JWT token and extract the userId
const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload).userId;
};

const UserProfile = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUserId = decodeToken(token);
      setUserId(decodedUserId);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
    skip: !userId,
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    phone: Yup.string(),
    year: Yup.number().required("Year is required").integer(),
    hostelOrRoomNo: Yup.string().required("Hostel/Room No is required"),
    branch: Yup.string().required("Branch is required"),
  });

  if (!userId) return <p>Loading user data...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <Formik
        initialValues={{
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          year: user.year || "",
          hostelOrRoomNo: user.hostelOrRoomNo || "",
          branch: user.branch || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateUser({
              variables: {
                userId,
                input: values,
              },
            });
            alert("Profile updated successfully");
          } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Year</label>
                <Field
                  type="number"
                  name="year"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hostel/Room No</label>
                <Field
                  type="text"
                  name="hostelOrRoomNo"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="hostelOrRoomNo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Branch</label>
                <Field
                  type="text"
                  name="branch"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="branch"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={isSubmitting}
              >
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;

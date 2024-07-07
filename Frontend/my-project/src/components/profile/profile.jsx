// This is going to be the profile page where user user can select different different profile pics along
// with various filds there is also going to be a update button
import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      image
      year
      hostelOrRoomNo
      branch
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID!
    $username: String!
    $image: String
    $year: Int!
    $hostelOrRoomNo: String!
    $branch: String!
  ) {
    updateUser(
      userId: $userId
      username: $username
      image: $image
      year: $year
      hostelOrRoomNo: $hostelOrRoomNo
      branch: $branch
    ) {
      _id
      username
      image
      year
      hostelOrRoomNo
      branch
    }
  }
`;

const UserProfile = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    image: Yup.string().url("Invalid URL"),
    year: Yup.number().required("Year is required").integer(),
    hostelOrRoomNo: Yup.string().required("Hostel/Room No is required"),
    branch: Yup.string().required("Branch is required"),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <Formik
        initialValues={{
          username: user.username || "",
          image: user.image || "",
          year: user.year || "",
          hostelOrRoomNo: user.hostelOrRoomNo || "",
          branch: user.branch || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateUser({
              variables: {
                userId,
                ...values,
              },
            });
            alert("Profile updated successfully");
          } catch (error) {
            console.error("Error updating profile:", error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
              <label className="block text-gray-700">Image</label>
              <Field
                type="text"
                name="image"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="image"
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
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={isSubmitting}
            >
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;

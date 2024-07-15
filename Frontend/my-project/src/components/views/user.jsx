import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      year
      username
      phone
      hostelOrRoomNo
      email
      branch
      _id
    }
  }
`;

const UserDetails = ({ userId }) => {  // we are getting the userId in the form of props 
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Year: {user.year}</p>
      <p>Branch: {user.branch}</p>
      <p>Hostel/Room No: {user.hostelOrRoomNo}</p>
      {user.phone && <p>Phone: {user.phone}</p>}
    </div>
  );
};

export default UserDetails;

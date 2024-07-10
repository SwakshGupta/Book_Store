import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
  hostelOrRoomNo: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

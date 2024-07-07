import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  

  image: {
    type: String,
    default: "default.jpg",
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
});

const User = mongoose.model("User", userSchema);

export default User;

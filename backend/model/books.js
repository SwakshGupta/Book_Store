import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  price: { type: Number },
});

 const addBooksSchema = new mongoose.Schema({
  year: { type: String, required: true },
  branch: { type: String, required: true },
  books: { type: [bookSchema], required: true },
  notesIncluded: { type: Boolean, required: true },
  image:{type:String,required:true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // because we are doing mapping with the user so we have to have userId in the book schema
   
});

 const Books = mongoose.model("AddBooks", addBooksSchema);

 export default Books;

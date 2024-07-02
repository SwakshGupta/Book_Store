import AddBooks from "../../model/books.js"

import cloudinary from "../../config/cloudinary.js";

export const booksResolvers = {

Query:
{
  getBooks:()=>
  [
    {
      title:"rd sharma",price:94
    }
  ]

},



  Mutation: {
    addBooks: async (_, { input }) => {

    const  book_Url="";

  if(input.image) // checks if there is any image in the input 
    {

      const result = await cloudinary.uploader.upload(input.image,{ // here we are uploading the image using the clodinary api

        folder:"book_image"
        
      })
      book_Url = result.secure_url; // this is the secured url of imahe 

    }

      const newAddBooks = new AddBooks({
           ...input,
           book_Url   // this is the book url stored in the  image section of the url 

      })
      await newAddBooks.save();
      return newAddBooks;
    },

    deleteBooks: async (_, { id }) => {
      try {
        const result = await AddBooks.findByIdAndDelete(id);

        return id == !null;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

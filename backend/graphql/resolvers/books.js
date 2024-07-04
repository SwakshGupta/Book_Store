import AddBooks from "../../model/books.js";

import cloudinary from "../../config/cloudinary.js";

export const booksResolvers = {
  Query: {
    getBooks: () => [
      {
        title: "rd sharma",
        price: 94,
      },
    ],

    getBooksById: async (_, { _id }) => {
      try {
        // Fetch the book from the database by _id
        const book = await AddBooks.findById(_id);

        if (!book) {
          throw new Error("Book not found");
        }

        // Check if 'image' in the book is a Cloudinary URL or public ID
        if (book.image.includes("cloudinary")) {
          // if the image url in the database is already a bookUrl then return the book 
          return book;
        } else {
         // If the image field is not a Cloudinary URL (assumed to be a public ID), 
         //these lines use Cloudinary's API to fetch the image's secure URL
          const result = await cloudinary.api.resource(book.image);
          const imageUrl = result.secure_url;

          // book.toObject() converts the Mongoose document to a plain JavaScript object, 
          // and the spread operator { ...book.toObject() } creates a new object with all the properties of the book
          
          return { ...book.toObject(), image: imageUrl };


        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch book with image");
      }
    },





  },

  Mutation: {
    addBooks: async (_, { input }) => {
      console.log("function is working");
      let bookUrl = "";

      if (input.image) {
        // checks if there is any image in the input
        const result = await cloudinary.uploader.upload(input.image, {
          // here we are uploading the image using the clodinary api

          folder: "book_image",
        });
        bookUrl = result.secure_url; // this is the secured url of imahe

        console.log(bookUrl)
      }

      const newAddBooks = new AddBooks({
        ...input,
        bookUrl, // this is the book url stored in the  image section of the url
      });
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

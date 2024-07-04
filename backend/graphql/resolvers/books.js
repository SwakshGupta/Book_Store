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
          // If 'image' is already a Cloudinary URL, return the book as is
          return book;
        } else {
          // If 'image' is a public ID, fetch the image URL from Cloudinary
          const result = await cloudinary.api.resource(book.image);
          const imageUrl = result.secure_url;

          // Update the book object with the fetched image URL
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

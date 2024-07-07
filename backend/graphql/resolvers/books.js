import AddBooks from "../../model/books.js";

import cloudinary from "../../config/cloudinary.js";

export const booksResolvers = {
  Query: {
    getAllBooks: async () => {
      console.log("Fetching all books...");

      try {
        const books = await AddBooks.find();

        // Validate and update the image URLs if needed
        const updatedBooks = await Promise.all(
          books.map(async (book) => {
            if (book.image && !book.image.includes("cloudinary")) {
              const result = await cloudinary.api.resource(book.image);
              book.image = result.secure_url;
              await book.save(); // Save the updated book document
            }
            return book;
          })
        );

        // Format the response according to the Books type
        return updatedBooks.map((book) => ({
          _id: book._id,
          year: book.year,
          branch: book.branch,
          books: book.books, // Assuming book.books is already in the correct format [Book!]!
          notesIncluded: book.notesIncluded,
          image: book.image,
        }));
      } catch (err) {
        console.error("Error fetching books:", err);
        throw new Error("Failed to fetch books");
      }
    },

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

          transformation: [
            { width: 250, height: 250, crop: "limit" }, // Specify desired dimensions here
          ],
        });
        bookUrl = result.secure_url; // this is the secured url of imahe

        console.log(bookUrl);
      }

      const newAddBooks = new AddBooks({
        ...input,
        image: bookUrl, // This will replace our base64 string with the cloudinary url
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

import Books from "../../model/books.js";
import {
  addBookToUser,
  getUserWithBooks,
} from "../../controllers/bookService.js";
import cloudinary from "../../config/cloudinary.js";

export const booksResolvers = {
  Query: {
    getAllBooks: async () => {
      
      try {
        const books = await Books.find();

        const updatedBooks = await Promise.all(
          books.map(async (book) => {
            if (book.image && !book.image.includes("cloudinary")) {
              const result = await cloudinary.api.resource(book.image); //  if the image added  is not in the cloudinary format then generate the url of image and save the image in cloud
              book.image = result.secure_url;
              await book.save(); // Save the updated book document
            }
            return book; // after uploading  image in the cloud return the book
          })
        );

        // Format the response according to the Books type
        return updatedBooks.map((book) => ({
          _id: book._id,
          year: book.year,
          branch: book.branch,
          books: book.books,
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
        const book = await Books.findById(_id);

        if (!book) {
          throw new Error("Book not found");
        }

        // Check if 'image' in the book is a Cloudinary URL or public ID
        if (book.image.includes("cloudinary")) {
          // if the image url in the database is already a bookUrl then return the book
          return book;
        } else {
          // If the image field is not a Cloudinary URL
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

    getUserWithBooks: async (_, { userId }) => {
      try {
        const user = await getUserWithBooks(userId);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user with books");
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

          folder: "books_images",

          transformation: [
            { width: 250, height: 250, crop: "limit" }, // Specify desired dimensions here
          ],
        });
        bookUrl = result.secure_url; // this is the secured url of imahe

        console.log(bookUrl);
      }

      const newBooks = new Books({ // creating data inside teh book model 
        ...input,
        image: bookUrl,
        userId: input.userId // This will replace our base64 string with the cloudinary url
       
      });
      await newBooks.save();

      
      if (input.userId) {
        await addBookToUser(input.userId, newBooks); 
      }

      return newBooks;
    },

    deleteBooks: async (_, { id }) => {
      try {
        const result = await Books.findByIdAndDelete(id);

        return id == !null;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

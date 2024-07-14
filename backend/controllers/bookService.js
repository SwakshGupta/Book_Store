import  User  from "../model/user.js";



export const addBookToUser = async (userId, bookData) => {
  try {
    const book = bookData;

    const user = await User.findById(userId); // here we are finding the perticular user by using his id

    user.books.push(book._id); // in the books array  in User collection we are adding bookid we will later use populate method to replace these id with actual books

    await user.save();

    return book;
  } catch (err) {
    throw new Error("Error adding the book ");
  }
};

export const getUserWithBooks = async (userId) => {
  try {
    const user = await User.findById(userId).populate("books"); // this will replace the userId with  actual books in  books array

    return user;
  } catch (err) {
    throw new Error("Error fetching the user with books");
  }
};

/**
  How does this populate method works .................

  1. Two collections in mongo db are linked with  the userid 

  2. populate method use to automatically fetch the related data from another collection and insert in the query result 

  3. A user can have multiple books so we have created a books id array in the user collection 

  4. so we have an array in the user which is collecting multiple book ids in the book array 

  5. when we query the user this populate method will automatically these books id with the actual book documents 

  6. This is the output without using the populate method

  /* Output:
{
  _id: 'userId',
  username: 'JohnDoe',
  email: 'john@example.com',
  books: ['bookId1', 'bookId2']
}

7. And this is the output with using the populate method 

{
  _id: 'userId',
  username: 'JohnDoe',
  email: 'john@example.com',
  books: [
    { _id: 'bookId1', title: 'Book 1', author: 'Author 1' },
    { _id: 'bookId2', title: 'Book 2', author: 'Author 2' }
  ]
}

without usinng populate we are just getting an array of book ids but with populate we are actually getting  the whole detail of books 

here is the summary of populate

populate helps fetch and include related data in your query results.
It replaces reference IDs with actual documents from the referenced collection.
Makes it easier to work with related data in a single query.






  */

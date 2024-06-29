import AddBooks from "../../model/books.js"

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
      const newAddBooks = new AddBooks(input);
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

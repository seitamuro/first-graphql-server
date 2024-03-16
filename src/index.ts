import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#gql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    library: [Library]
  }

  type Library {
    name: String
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const library = [
  {
    name: "Library of Congress",
    books: [books[0]],
  },
  {
    name: "New York Public Library",
    books: [books[1]],
  },
  {
    name: "Library of Alexandria",
    books: [books[0], books[1]],
  },
];

const resolvers = {
  Query: {
    books: () => books,
    library: () => library,
  },
  Mutation: {
    addBook: (_: any, { title, author }: any) => {
      const newBook = { title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

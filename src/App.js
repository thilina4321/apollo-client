import React, { useCallback, useEffect, useState } from "react";

import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import Books from "./components/books/books";

const BOOKS = gql`
  query getBooks {
    getBooks {
      id
      name
      price
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($name:String, $price:Int){
    addBook(name:$name, price:$price)
  }
`;

const GET_BOOK = gql`
  subscription getBook{
    getBook{
      id
      name
      price
    }
  }
`

const App = () => {
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(BOOKS);

  const [
    addBook,
    { data: message, error: messageError, loading: messageLoading },
  ] = useMutation(ADD_BOOK);
  const [books, setBooks] = useState([]);

  const {data:bookData} = useSubscription(GET_BOOK)

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.getBooks);
    }
    
  }, [booksData, bookData]);

  useEffect(()=>{
    if(bookData){
      setBooks(pre=> [...pre, {...bookData.getBook}] )
    }
  }, [bookData])

  const bookAddHandler = useCallback(
    (data) => {
      const { name, price } = data;
      
      addBook({variables:{name:name, price:+price}});
      // if (messageError) {
      //   console.log(messageError);
      // }

      console.log(message);
    },
    
    [addBook, message]
  );

  console.log(bookData);

  if (booksLoading) {
    return <p> Loading.... </p>;
  }

  if (booksError) {
    return <p> Sorry something went wrong...... </p>;
  }

  return (
    <div>
      <Books books={books} bookAddHandler={bookAddHandler} />
    </div>
  );
};

export default App;

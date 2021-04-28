import React, { useRef } from "react";

import Book from "./book";

const Books = (props) => {
  const { books , bookAddHandler} = props;

  const nameRef = useRef()
  const priceRef = useRef()

  const formDataHandler = (e)=>{
      e.preventDefault();
      
      const name = nameRef.current.value
      const price = priceRef.current.value

      bookAddHandler({name, price})

  }

  return (
    <div>

    <form onSubmit={formDataHandler} >
        <label htmlFor="name"> Name </label>
        <input ref={nameRef} id="name"  />
        <label htmlFor="price"> Price </label>
        <input ref={priceRef} id="price" />
        <button type="submit" > Add </button>
    </form>

      {books.map((book) => (
        <Book key={book.id} name={book.name} price={book.price} />
      ))}
    </div>
  );
};

export default Books;

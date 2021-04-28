import React from 'react'

import classes from './book.module.css'

const Book = (props) => {
    const {id, name, price} = props
    const removeHandler = ()=>{

    }
    return (
        <div className={classes.book} onClick={()=>removeHandler(id)} >
            <h1> {name} </h1>
            <p className={classes.price} > Rs. {price} </p>
        </div>
    )
}

export default Book

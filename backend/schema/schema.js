const {gql} = require('apollo-server-express')

const schema = gql`
    type Query{
        getBooks:[Book]
    }

    type Mutation{
        addBook(name:String, price:Int):String
    } 

    type Subscription{
        getBook:Book
    }

    type Book{
        id:Int
        name:String
        price:Int
    }
`

module.exports = schema
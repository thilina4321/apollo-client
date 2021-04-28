const Mutation = {
    addBook(parent, args, {db, pubsub}, info){
        let books = db.books
        const id = books.length +1
        console.log(args);

        const book = {id, ...args}
        books.push(book)
        pubsub.publish(['book'], {getBook:book})
        return 'books added'
    }
}

module.exports = Mutation
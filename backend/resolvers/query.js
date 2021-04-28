const Query = {
    getBooks(parent, args, {db}, info){
        console.log(db);
        return db.books
    }
}

module.exports = Query
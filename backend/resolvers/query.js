const Query = {
    async getBooks(parent, args, {db,isAuth}, info){
        return db.books
    }
}

module.exports = Query
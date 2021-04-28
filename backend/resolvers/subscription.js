const Subscription = {
    getBook:{
        subscribe(parent, args, {db, pubsub}, info){
            return pubsub.asyncIterator(['book'])
        }
    }
}

module.exports = Subscription
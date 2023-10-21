const {MongoClient, ServerApiVersion} = require('mongodb')
const config = require('../config')
const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWWORD}@clusterapi.ia0vqmv.mongodb.net/?retryWrites=true&w=majority`;

class MongoDB {
    client;
    connection;
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi:{
                version: ServerApiVersion.v1,
                strict: true,

            }
        });
    }

    async connect(){
        return await this.client.connect();
    }

    async getAll(database, collection){
        const db = this.client.db(database);
        const collection = db.collection(collection);

        const users = await collection.find();

        return users;
    }
}

module.exports = MongoDB;
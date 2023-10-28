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
                strict: true
            }
        });
    }

    async getAll(collection){
        await this.client.connect()
        const users = this.client.db("API").collection(collection);
        return users.find();
    }

    async getOne(collection, query){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.findOne(query);
    }

    //Faltan métodos del CRUD
    //InsertOne
    //InsertMany
    //Update
    //Delete
}

module.exports = MongoDB;
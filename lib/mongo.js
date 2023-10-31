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

    async getOne(collection, query){ //La solución funciona pero se requiere que la consulta se haga sobre una llave primaria
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.find(query);
    }

    //Faltan métodos del CRUD
    //Update
    //Delete

    async insertOne(collection, usuario){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.insertOne(usuario);
    }

    async insertMany(collection, usuarios){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        const results = await users.insertMany(usuarios);
        return results.insertedIds;
    }

    
}

module.exports = MongoDB;
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
        try {
            await this.client.connect()

            const users = this.client.db("API").collection(collection);
            
            return users.find();

        } catch (e) {}
    }

    async getOne(collection, query){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection);
            
            return await users.findOne(query);
        
        } catch (e) {}
    }

    async insertOne(collection, usuario){
        try {
            await this.client.connect();
            
            const users = this.client.db("API").collection(collection);
            
            return await users.insertOne(usuario);
        
        } catch (e) {}
    }

    async insertMany(collection, usuarios){
        try {
            await this.client.connect();
            
            const users = this.client.db("API").collection(collection);
            const results = await users.insertMany(usuarios);
            
            return results.insertedIds;
        
        }finally {
            await this.client.close();
        }
    }

    async updateSet(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const update = {
                $set: {
                    correo: "panadaaniel@javeriana.edu.co"
                },
            };

            return await users.updateOne(filter, update)
        }finally {
            await this.client.close();
        }
    }

    async updateInc(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const update = {
                $inc: {
                    edad: 1
                },
            };

            return await users.updateOne(filter, update)
        }finally {
            await this.client.close();
        }
    }

    async updateRename(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const update = {
                $rename: {
                    edad: "anios"
                },
            };

            return await users.updateOne(filter, update)
        }finally {
            await  this.client.close();
        }
    }
    
    async updateUnset(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const update = {
                $unset: {
                    anios: 1
                },
            };

            return await users.updateOne(filter, update)
        }finally {
            await  this.client.close();
        }
    }

    async updateMul(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const update = {
                $mul: {
                    puntaje: 2
                },
            };

            return await users.updateOne(filter, update)
        }finally {
            await this.client.close();
        }
    }

    async replaceOne(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            const replace = {
                nombre: "Dani",
                correo: "xXx@hotmail.com",
                edad: 23,
                puntaje: 0,
            };

            return await users.replaceOne(filter, replace)
        }finally {
            this.client.close();
        }
    }

    async updateOne(collection, data, query) {
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.updateOne(query, data);
    }

    async deleteOne(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            return await users.deleteOne(filter)

        }finally {
            this.client.close();
        }
    }

    async deleteMany(collection, filter){
        try {
            await this.client.connect();

            const users = this.client.db("API").collection(collection)

            return await users.deleteMany(filter)
            
        }finally {
            this.client.close();
        }
    }
}

module.exports = MongoDB;
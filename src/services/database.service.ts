import * as mongoDB from "mongodb";

export const collections:{games?:mongoDB.Collection} = {}

export async function connectToDatabase () {
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || 'mongodb://localhost:27017/');
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME || "TypeScript");

    await db.command({
        "collMod": process.env.GAMES_COLLECTION_NAME || 'games',
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "category"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string"
                    },
                    price: {
                        bsonType: "number",
                        description: "'price' is required and is a number"
                    },
                    category: {
                        bsonType: "string",
                        description: "'category' is required and is a string"
                    }
                }
            }
         }
    });

    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME || 'games');
    collections.games = gamesCollection;
    collections.games.createIndex('name')

       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
 }
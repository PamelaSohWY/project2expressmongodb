const MongoClient = require('mongodb').MongoClient;

// global variable is to store the database
let _db;

//create a function to link to mongodatabase 
async function connect(url, dbname) {
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    })

    //selection of the database to be used 
    _db = client.db(dbname);
    console.log("Database connected");
}

function getDB() {
    return _db;
}

//to export out (share) connect and getDB functions
module.exports = {
    connect, getDB
}
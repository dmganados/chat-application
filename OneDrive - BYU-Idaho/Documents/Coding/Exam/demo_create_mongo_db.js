let MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://wdc028-course-booking.scqvn.mongodb.net/dbSample";

MongoClient.connect(url, (err,db) => {
    if (err) throw err;
    console.log("Database created!");
    db.close;
});
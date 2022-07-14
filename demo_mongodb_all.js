const { ObjectId } = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("web002db");
    var data = [
        { name: "Lee", address: "Pathein" },
        { name: "Lee 2", address: "Yangon" },
        { name: "Lee 3", address: "ChaungThar" },
    ];
    dbo.collection("users").insertMany(data, function(err, res) {
        if (err) throw err;
        console.log("All Data inserted!" + res.insertedCount);
    });
    var sort = { name: 1 };
    dbo
        .collection("users")
        .find()
        .sort(sort)
        .toArray(function(err1, res1) {
            if (err1) throw err1;
            console.log(res1);
        });
    var del = { address: /^P/ };
    dbo.collection("users").deleteMany(del, function(err2, res2) {
        if (err2) throw err2;
        console.log(res2);
        console.log("Deleted Count" + res2.deletedCount);
    });
    var ud = { address: /^Y/ };
    var nw = { $set: { name: "Lee Lee Lr Lr", address: "Lee Pl Ya Ml" } };
    dbo.collection("users").updateMany(ud, nw, function(err3, res3) {
        if (err3) throw err3;
        console.log("Updated");
    });
    dbo.collection("users").deleteMany({}, function(err4, res4) {
        if (err4) throw err4;
        console.log("Delete all" + res4.deletedCount);
    });
    dbo.createCollection("products", function(err5, res5) {
        if (err5) throw err5;
        console.log("Collection Created");
        var pinsert = [
            { _id: 1, name: "Coffee", price: "1000" },
            { _id: 2, name: "Nice", price: "1000" },
            { _id: 3, name: "Good", price: "1000" },
        ];
        dbo.collection("products").insertMany(pinsert, function(err6, res6) {
            if (err6) throw err6;
            console.log("Inserted" + res6.insertedCount);
            var q = { _id: 3 };
            dbo.collection("products").findOne(q, function(err7, res7) {
                if (err7) throw err7;
                console.log(res7);
                db.close();
            });
        });
    });


});
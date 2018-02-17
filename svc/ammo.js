const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const ObjectID = require('mongodb').ObjectID;

function Ammo() {

}

Ammo.prototype.add = (form) => {
    //console.log(form)
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        //console.log("Connected successfully to server");
        const db = client.db('armintory');
        db.collection('ammo').insertOne(form, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
        });
        client.close();
    });
}

Ammo.prototype.edit = (update) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var o_id = new ObjectID(update._id)
            // console.log(o_id + ' ' + update._id);
        const db = client.db('armintory');
        db.collection('ammo').updateOne({ _id: o_id }, {
            $set: {
                name: update.name,
                caliber: update.caliber,
                round: update.round,
                case: update.case,
                numRounds: update.numRounds,
                cpr: update.cpr
            }
        }, function(err, update) {
            // console.error('finished!')
            // console.error(update.result)
        });

    });
}

Ammo.prototype.roundLookup = (callback) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var rounds = []
            //console.log("Connected successfully to server, round lookup");
        const db = client.db('armintory');
        db.collection('round').find().each(function(err, doc) {
            if (doc) {
                //console.log(doc)
                rounds.push(doc);
            } else {
                client.close();
                //console.log("returning")
                callback(rounds);
            }
        });
    });
}

Ammo.prototype.caseLookup = (callback) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var cases = []
            //console.log("Connected successfully to server, case lookup");
        const db = client.db('armintory');
        db.collection('case').find().each(function(err, doc) {
            if (doc) {
                //console.log(doc)
                cases.push(doc);
            } else {
                client.close();
                //console.log("returning")
                callback(cases);
            }
        });
    });
}

Ammo.prototype.caliberLookup = (callback) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var calibers = []
            //console.log("Connected successfully to server, caliber lookup");
        const db = client.db('armintory');
        db.collection('caliber').find().each(function(err, doc) {
            if (doc) {
                //console.log(doc)
                calibers.push(doc);
            } else {
                client.close();
                //console.log("returning")
                callback(calibers);
            }
        });
    });
}

Ammo.prototype.getAllAmmo = (callback) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var ammo = [];
        const db = client.db('armintory')
        db.collection('ammo').find().each(function(err, doc) {
            if (doc) {
                ammo.push(doc);
            } else {
                client.close()
                callback(ammo)
            }
        })
    })
}

Ammo.prototype.getAmmo = (id, callback) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var ammo = [];
        const db = client.db('armintory');
        var o_id = new ObjectID(id);
        db.collection('ammo').find({ _id: o_id }).toArray(function(err, doc) {
            assert.equal(null, err);
            callback(doc[0]);
        });
    })
}
module.exports = Ammo;
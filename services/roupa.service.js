var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('roupa');

var service = {};
service.createItem = createItem;
service.getallItem = getallItem;
service.delete = deleteItem;

module.exports = service;

function getallItem(user)
{
    var deferred = Q.defer();
    let query = {
        userid: user
    }
    db.roupa.find(query).toArray(function (err, doc)
    {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(doc);
    }
    )
    return deferred.promise;
} 



function createItem(Roupa) 
{
    var query = {
        cod_item: Roupa.cod_item
    }
    var deferred = Q.defer();
    
    db.roupa.findOneAndUpdate(
        query,
        Roupa, 
        {upsert: true},
        function (err, doc) 
        {
            if (err)
                    deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        }
    );
    return deferred.promise;
}


 function deleteItem(_id) {
    var deferred = Q.defer();
    db.roupa.remove(
        { _id: mongo.helper.toObjectID(_id)
         },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}


'use strict';
const ParseObject = Parse.Object.extend('Favourites');
module.exports = {
    addInfotoFavourites: addInfotoFavourites,
    findIsFavouritesOrNot : findIsFavouritesOrNot,
    remove_From_Favourites : remove_From_Favourites
};


function addInfotoFavourites(req, res) {
    var favouritesInfo = req.params.favouritesInfo;
    var userwholiked = {"__type": "Pointer", "className": "_User", "objectId": favouritesInfo.userwholiked};
    var likeduser = {"__type": "Pointer", "className": "_User", "objectId": favouritesInfo.likeduser};
    var Favourites = Parse.Object.extend("Favourites");
    var person = new Favourites();

    person.set('userwholiked', userwholiked);
    person.set('likeduser', likeduser);
    person.save(null, {
        success: function (person) {
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}

function findIsFavouritesOrNot(req,res){
   var favouritesInfo = req.params.favouritesInfo;
       new Parse.Query("Favourites")
        .equalTo('userwholiked', {"__type":"Pointer","className":"_User","objectId":favouritesInfo.userwholiked})
        .equalTo('likeduser', {"__type":"Pointer","className":"_User","objectId":favouritesInfo.likeduser})
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));
}
function remove_From_Favourites(req,res){
    var favouritesInfo = req.params.favouritesInfo;
        new Parse.Query("Favourites")
        .equalTo('userwholiked', {"__type":"Pointer","className":"_User","objectId":favouritesInfo.userwholiked})
        .equalTo('likeduser', {"__type":"Pointer","className":"_User","objectId":favouritesInfo.likeduser})
        .find().then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));
}

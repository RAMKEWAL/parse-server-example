'use strict';

const GalleryActivity = require('./../class/User');
const ParseObject     = Parse.Object.extend('Matches');
module.exports        = {
    addedToLiked         : addedToLiked,
    getPersonWhoLiked    : getPersonWhoLiked,
    removeUserWhoLiked   : removeUserWhoLiked,
    findifLikedIdHasLiked: findifLikedIdHasLiked,
    getLatestMatchMade   : getLatestMatchMade,
    removeLatestMatchById: removeLatestMatchById
};


function addedToLiked(req, res) {
    var params = req.params;
    var userwholiked={"__type":"Pointer","className":"_User","objectId":params.userwholiked};
    var userliked={"__type":"Pointer","className":"_User","objectId": params.userliked};
var Matches = Parse.Object.extend("Matches");
var person = new Matches();

person.set('userwholiked',userwholiked );
person.set('userliked',userliked);

person.save(null,{
  success:function(person) { 
    res.success(person);
  },
  error:function(error) {
    res.error(error);
  }
});
}
function getPersonWhoLiked(req,res){
     var id = req.params.id;
        new Parse.Query("Matches")
        .equalTo('userliked', {"__type":"Pointer","className":"_User","objectId":id})
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));

}
function removeUserWhoLiked(req,res){
     var id = req.params.id;
        new Parse.Query("Matches")
        .equalTo('userwholiked', {"__type":"Pointer","className":"_User","objectId":id})
        .find().then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));

}
function findifLikedIdHasLiked(req,res){
    var users_who_liked=req.params.userwholikedeachOther;
new Parse.Query("Matches")
        .equalTo('userwholiked', {"__type":"Pointer","className":"_User","objectId":users_who_liked.userwholiked})
        .equalTo('userliked', {"__type":"Pointer","className":"_User","objectId":users_who_liked.userliked})
        .find().then(results => res.success(results || {}), error=> res.error(error.message));
}

function getLatestMatchMade(req,res){
     var id = req.params.id;
     new Parse.Query("Matches")
        .equalTo('userwholiked', {"__type":"Pointer","className":"_User","objectId":id})
        .descending("createdAt").limit(1)
        .find().then(results => res.success(results || {}), error=> res.error(error.message));
}
function removeLatestMatchById(req,res){
    var id = req.params.id;
        new Parse.Query("Matches")
        .equalTo('objectId',id)
        .find().then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));
}


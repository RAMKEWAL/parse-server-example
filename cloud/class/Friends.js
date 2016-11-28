'use strict';

const GalleryActivity = require('./../class/User');
const ParseObject     = Parse.Object.extend('Friends');
module.exports        = {
    AddToFriendList         : addToFriendList,
    GetUsersToSuggest       : GetUsersToSuggest
};


function addToFriendList(req, res) {
    var friend_Of = req.params.signedUserId;
    var friend_Is = req.params.whoInvited;
    var friendOf={"__type":"Pointer","className":"_User","objectId":friend_Of};
    var friend={"__type":"Pointer","className":"_User","objectId": friend_Is};
    var Friends = Parse.Object.extend("Friends");
    var friends = new Friends();

    friends.set('friendOf',friendOf );
    friends.set('friend',friend);

    friends.save(null,{
      success:function(friends) { 
        addFriendInReverse(friendOf,friend);
        res.success(friends);
      },
      error:function(error) {
        res.error(error);
      }
    });
}
function addFriendInReverse(friendOf,friend){
    var Friends = Parse.Object.extend("Friends");
    var friends = new Friends();

    friends.set('friendOf',friend );
    friends.set('friend',friendOf);

    friends.save(null,{
      success:function(friends) { 
        console.log(friends);
      },
      error:function(error) {
        console.log(error);
      }
    });
}

function GetUsersToSuggest(req,res){
        var id = req.params.id;
        var query = new Parse.Query("Friends");
        query.equalTo("friendOf", {"__type":"Pointer","className":"_User","objectId": id});
        query.find({useMasterKey: true})
        .then(results => res.success(results || {}), error => res.error(error.message));
}

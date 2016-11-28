'use strict';

const ParseObject = Parse.Object.extend('ChatUsers');
module.exports = {
    matchFoundForchat: matchFoundForchat,
    ismatchfoundForchat: ismatchfoundForchat,
    isChatUsersPresent: isChatUsersPresent,
    removeLatestChatUserMade : removeLatestChatUserMade
};


function matchFoundForchat(req, res) {
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    var matchId = req.params.matchId;
    var lastmsg = new Date();
    var ChatUsers = Parse.Object.extend("ChatUsers");
    var users = new ChatUsers();

    users.set('firstuser', {"__type": "Pointer", "className": "_User", "objectId": id1});
    users.set('seconduser', {"__type": "Pointer", "className": "_User", "objectId": id2});
    users.set('matchId', matchId);
    users.set('lastmessage', lastmsg);
    users.set('read', 0)
    users.save(null, {
        success: function (users) {
            res.success(users);
        },
        error: function (users) {
            res.error(users);
        }
    });
}
function ismatchfoundForchat(req, res) {

    var id = req.params.id;
    var firstuser = new Parse.Query("ChatUsers");
    firstuser.equalTo('firstuser', {"__type": "Pointer", "className": "_User", "objectId": id});

    var seconduser = new Parse.Query("ChatUsers");
    seconduser.equalTo('seconduser', {"__type": "Pointer", "className": "_User", "objectId": id});

    var mainQuery = Parse.Query.or(firstuser, seconduser);
    mainQuery.find({
        success: function (results) {
            res.success(results);

        },
        error: function (error) {
            res.error(error);
        }
    });

}
function isChatUsersPresent(req, res) {
    var ids = req.params.ids;
    new Parse.Query("ChatUsers")
            .equalTo('firstuser', {"__type": "Pointer", "className": "_User", "objectId": ids.firstuser})
            .equalTo('seconduser', {"__type": "Pointer", "className": "_User", "objectId": ids.seconduser})
            .find().then(results => res.success(results || {}), error => res.error(error.message));
}
function removeLatestChatUserMade(req,res){
    var ids = req.params.ids;
    new Parse.Query("ChatUsers")
            .equalTo('firstuser', {"__type": "Pointer", "className": "_User", "objectId": ids.userliked})
            .equalTo('seconduser', {"__type": "Pointer", "className": "_User", "objectId": ids.userId})
            .find().then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));
}



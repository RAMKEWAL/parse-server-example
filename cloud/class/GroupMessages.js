'use strict';

const ParseObject     = Parse.Object.extend('GroupMessages');
module.exports        = {
  saveGroupChatMessage  : saveGroupChatMessage,
  getGroupChatWithParticularUser : getGroupChatWithParticularUser,
  deleteGroupChats : deleteGroupChats
};


function saveGroupChatMessage(req, res) {
    var info = req.params.message;
var GroupMessages = Parse.Object.extend("GroupMessages");
var msg = new GroupMessages();

msg.set('senderId',{"__type":"Pointer","className":"_User","objectId":info.senderId} );
msg.set('recieverIds',{"__op":"AddRelation","objects":info.recieverIds});
msg.set('groupId',{"__type":"Pointer","className":"GroupChats","objectId":info.groupId});
msg.set('senderName',info.senderName);
msg.set('image',info.image);
msg.set('audio',info.audio);
msg.set('text',info.text);
msg.set('sentAt',info.sentAt);
msg.save(null,{
  success:function(msg) { 
    res.success(msg);
  },
  error:function(msg) {
    res.error(msg);
  }
});
}
function getGroupChatWithParticularUser(req,res){
     var groupId = req.params.groupId;
     new Parse.Query("GroupMessages")
        .equalTo('groupId',{"__type":"Pointer","className":"GroupChats","objectId":groupId} )
        .descending('createdAt')
        .limit(30)
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));
}

function deleteGroupChats(req,res){
    var groupId = req.params.id;
    new Parse.Query("GroupMessages")
        .equalTo('groupId',{"__type":"Pointer","className":"GroupChats","objectId":groupId} )
        .find({useMasterKey: true}).then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));
}





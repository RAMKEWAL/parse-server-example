'use strict';

const ParseObject     = Parse.Object.extend('ChatMessage');
module.exports        = {
  saveChatMessage  : saveChatMessage,
  getChatWithParticularUser    : getChatWithParticularUser
 
};


function saveChatMessage(req, res) {
    var info = req.params.message;
   
var ChatMessage = Parse.Object.extend("ChatMessage");
var msg = new ChatMessage();

msg.set('senderId',{"__type":"Pointer","className":"_User","objectId":info.senderId} );
msg.set('recieverId',{"__type":"Pointer","className":"_User","objectId":info.recieverId});
msg.set('matchId',info.matchId);
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
function getChatWithParticularUser(req,res){
     new Parse.Query("ChatMessage")
        .equalTo('matchId', req.params.matchId)
        .descending('createdAt')
        .limit(30)
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));
}




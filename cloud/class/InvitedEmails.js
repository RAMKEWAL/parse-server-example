'use strict';

const ParseObject     = Parse.Object.extend('InvitedEmails');

module.exports        = {
 addFriendEmail : addFriendEmail,
 FindEmailAsFriend : findEmailAsFriend
};


function addFriendEmail(req, res) {
    var selectedEmail = req.params.selected;
    var id= req.params.id;
    var newts = new Array();

    for ( var i = 0; i < selectedEmail.length; i++ )
        {
        //add these entries to db
        var DataClass = Parse.Object.extend("InvitedEmails");
        var newuser = new DataClass();
        newuser.set("email",selectedEmail[i]);
        newuser.set("whoInvited", {"__type":"Pointer","className":"_User","objectId":id});
        newts[i]=newuser; //add another item to list        
        }

    Parse.Object.saveAll(newts,{
        success:function(users) { 
         res.success(users);
       },
       error:function(users) {
         res.error(users);
       }
  });

}

function findEmailAsFriend(req,res){
    var params = req.params.email;
    new Parse.Query("InvitedEmails")
        .equalTo('email', params)
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));
}



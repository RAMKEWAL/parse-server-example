'use strict';

const ParseObject     = Parse.Object.extend('GroupChats');
module.exports        = {
 createGroup      : createGroup,
 getChatGroups    : getChatGroups,
 getPeopleInGroup : getPeopleInGroup,
 updateGroupChat  : updateGroupChat,
 getUserCreatedGroups : getUserCreatedGroups,
 deleteSelectedGroup : deleteSelectedGroup
};


function createGroup(req, res) {
    var groupname = req.params.groupName;
    var groupcreatorId=req.params.groupcreatorId;
    var grouppeople = req.params.groupPeopleIds;
    var lastmsg=new Date();
    var GroupChats = Parse.Object.extend("GroupChats");
    var group = new GroupChats();
    group.set('groupname',groupname);
    group.set('groupcreator',{"__type":"Pointer","className":"_User","objectId":groupcreatorId});
    group.set('grouppeople',{"__op":"AddRelation","objects":grouppeople});
    group.set('read',0);
    group.set('lastmessage',lastmsg);
    group.save(null,{
      success:function(group) { 
        res.success(group);
      },
      error:function(group) {
        res.error(group);
      }
    });
    }
    function getChatGroups(req,res){
        var id=req.params.id;

        var firstuser = new Parse.Query("GroupChats");
        firstuser.equalTo('groupcreator', {"__type":"Pointer","className":"_User","objectId":id});

        var seconduser = new Parse.Query("GroupChats");
        seconduser.equalTo('grouppeople', {"__type":"Pointer","className":"_User","objectId":id});

        var mainQuery = Parse.Query.or(firstuser, seconduser);
        mainQuery.find({
          success: function(results) {
              res.success(results);
          },
          error: function(error) {
          res.error(error);
          } 
        });
 

    }
    function getUserCreatedGroups (req,res){
        var id=req.params.id;
        new Parse.Query("GroupChats").equalTo('groupcreator', {"__type":"Pointer","className":"_User","objectId":id}).find({useMasterKey: true})
        .then(result=>res.success(result));
    }
    function getPeopleInGroup(req,res){
        var objectId=req.params.id;
        //var obj={"__type":"Pointer","className":"GroupChats","objectId":objectId};
        var query = new Parse.Query(Parse.User);
         query.equalTo('$relatedTo', {
        "object":{"__type":"Pointer","className":"GroupChats","objectId":objectId},"key":"grouppeople"}).find({useMasterKey: true})
         .then(result=>res.success(result));
    }

    function updateGroupChat(req,res){
        var groupId=req.params.groupId;
        var grouppeople=req.params.ids;
        new Parse.Query("GroupChats")
        .equalTo('objectId', groupId)
        .first({useMasterKey: true}).then(objUser => {
        objUser.set('grouppeople',{"__op":"AddRelation","objects":grouppeople});
        return objUser.save(null, {useMasterKey: true});
        }).then(success => res.success(success), error => res.error(error.message));
    }
    
    function deleteSelectedGroup(req,res){
         var id=req.params.id;
         new Parse.Query("GroupChats")
        .equalTo('objectId', id)
        .find().then(function(results) {
            return Parse.Object.destroyAll(results);
                }).then(results => res.success(results || {}), error=> res.error(error.message));
    }
           
            
        
        
  

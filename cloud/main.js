'use strict';
const Install         = require('./class/Install');
const User            = require('./class/User');
const Gallery         = require('./class/Gallery');
const GalleryActivity = require('./class/GalleryActivity');
const GalleryComment  = require('./class/GalleryComment');
const Installation    = require('./class/Installation');
const Matches    = require('./class/Matches');
const ChatUsers    = require('./class/ChatUsers');
const ChatMessage    = require('./class/ChatMessage');
const GroupChats    = require('./class/GroupChats');
const GroupMessages    = require('./class/GroupMessages');
const InvitedEmails    = require('./class/InvitedEmails');
const Friends    = require('./class/Friends');
const Interests    = require('./class/Interests');
const SuggestedMatches    = require('./class/SuggestedMatches');
const Favourites    = require('./class/Favourites');
const MatchMakingSetting    = require('./class/MatchMakingSetting');



// Instalattion
Parse.Cloud.beforeSave(Installation.beforeSave);

// Install
Parse.Cloud.define('status', Install.status);
Parse.Cloud.define('install', Install.start);

// Admin Dashboard

// GalleryActivity
Parse.Cloud.define('feedActivity', GalleryActivity.feed);
//Parse.Cloud.afterSave('GalleryActivity', GalleryActivity.afterSave);

// User
Parse.Cloud.beforeSave(Parse.User, User.beforeSave);
Parse.Cloud.afterSave(Parse.User, User.afterSave);
//Parse.Cloud.afterDelete(Parse.User, User.afterDelete);

Parse.Cloud.define('findUserByUsername', User.findUserByUsername);
Parse.Cloud.define('findUserByEmail', User.findUserByEmail);
Parse.Cloud.define('profile', User.profile);
Parse.Cloud.define('getUsers', User.getUsers);
Parse.Cloud.define('createUser', User.createUser);
Parse.Cloud.define('updateUser', User.updateUser);
Parse.Cloud.define('destroyUser', User.destroyUser);
Parse.Cloud.define('saveFacebookPicture', User.saveFacebookPicture);
Parse.Cloud.define('validateUsername', User.validateUsername);
Parse.Cloud.define('validateEmail', User.validateEmail);
Parse.Cloud.define('updateuserLocation', User.updateuserLocation);
Parse.Cloud.define('getMatches', User.getMatches);
Parse.Cloud.define('getchatuserdetails', User.getchatuserdetails);
Parse.Cloud.define('GetFriendsInfo', User.GetFriendsInfo);
Parse.Cloud.define('getUserById', User.getUserById);
Parse.Cloud.define('GetFriendsOfFriendNotLiked', User.GetFriendsOfFriendNotLiked);
Parse.Cloud.define('getMaleUsers', User.getMaleUsers);
Parse.Cloud.define('getFemaleUsers', User.getFemaleUsers);



// Gallery
Parse.Cloud.beforeSave('Gallery', Gallery.beforeSave);
Parse.Cloud.afterSave('Gallery', Gallery.afterSave);
Parse.Cloud.afterDelete('Gallery', Gallery.afterDelete);
Parse.Cloud.define('feedGallery', Gallery.feed);
Parse.Cloud.define('commentGallery', Gallery.commentGallery);
Parse.Cloud.define('likeGallery', Gallery.likeGallery);
Parse.Cloud.define('isGalleryLiked', Gallery.isGalleryLiked);

// GalleryComment
Parse.Cloud.beforeSave('GalleryComment', GalleryComment.beforeSave);
Parse.Cloud.afterSave('GalleryComment', GalleryComment.afterSave);

Parse.Cloud.define('getPersonWhoLiked', Matches.getPersonWhoLiked);
Parse.Cloud.define('addeduserToLiked', Matches.addedToLiked);
Parse.Cloud.define('getuserwholikedinfo', User.getuserwholikedinfo);
Parse.Cloud.define('removeUserWhoLiked', Matches.removeUserWhoLiked);
Parse.Cloud.define('findifLikedIdHasLiked', Matches.findifLikedIdHasLiked);
Parse.Cloud.define('getLatestMatchMade', Matches.getLatestMatchMade);
Parse.Cloud.define('removeLatestMatchById', Matches.removeLatestMatchById);



Parse.Cloud.define('matchFoundForchat', ChatUsers.matchFoundForchat);
Parse.Cloud.define('ismatchfoundForchat', ChatUsers.ismatchfoundForchat);
Parse.Cloud.define('isChatUsersPresent', ChatUsers.isChatUsersPresent);
Parse.Cloud.define('removeLatestChatUserMade', ChatUsers.removeLatestChatUserMade);


Parse.Cloud.define('saveChatMessage', ChatMessage.saveChatMessage);
Parse.Cloud.define('getChatWithParticularUser', ChatMessage.getChatWithParticularUser);



Parse.Cloud.define('createGroup', GroupChats.createGroup);
Parse.Cloud.define('getChatGroups', GroupChats.getChatGroups);
Parse.Cloud.define('getUserCreatedGroups', GroupChats.getUserCreatedGroups);
Parse.Cloud.define('getPeopleInGroup', GroupChats.getPeopleInGroup);
Parse.Cloud.define('updateGroupChat', GroupChats.updateGroupChat);
Parse.Cloud.define('deleteSelectedGroup', GroupChats.deleteSelectedGroup);



Parse.Cloud.define('saveGroupChatMessage', GroupMessages.saveGroupChatMessage);
Parse.Cloud.define('getGroupChatWithParticularUser', GroupMessages.getGroupChatWithParticularUser);
Parse.Cloud.define('deleteGroupChats', GroupMessages.deleteGroupChats);


Parse.Cloud.define('GetUsersToSuggest', Friends.GetUsersToSuggest);

Parse.Cloud.define('addFriendEmail', InvitedEmails.addFriendEmail);
Parse.Cloud.define('FindEmailAsFriend', InvitedEmails.FindEmailAsFriend);


Parse.Cloud.define('AddToFriendList', Friends.AddToFriendList);


Parse.Cloud.define('getAllInterests', Interests.getAllInterests);

//SuggestedMatches
Parse.Cloud.define('saveSuggestedInfo', SuggestedMatches.saveSuggestedInfo);
Parse.Cloud.define('getSuggestedMatches', SuggestedMatches.getSuggestedMatches);
Parse.Cloud.define('saveBothSuggestedMatches', SuggestedMatches.saveBothSuggestedMatches);
Parse.Cloud.define('saveMaleSuggestedMatches', SuggestedMatches.saveMaleSuggestedMatches);
Parse.Cloud.define('saveFemaleSuggestedMatches', SuggestedMatches.saveFemaleSuggestedMatches);



Parse.Cloud.define('addInfotoFavourites', Favourites.addInfotoFavourites);
Parse.Cloud.define('findIsFavouritesOrNot', Favourites.findIsFavouritesOrNot);
Parse.Cloud.define('remove_From_Favourites', Favourites.remove_From_Favourites);



Parse.Cloud.define('addMatchMakingSettings', MatchMakingSetting.addMatchMakingSettings);
Parse.Cloud.define('UpdateMatchMakingSettings', MatchMakingSetting.UpdateMatchMakingSettings);
Parse.Cloud.define('UpdateLocMatchMakingSettings', MatchMakingSetting.UpdateLocMatchMakingSettings);
Parse.Cloud.define('getMatchMakingSettingsbyId', MatchMakingSetting.getMatchMakingSettingsbyId);
Parse.Cloud.define('updateMatchMakingChanges', MatchMakingSetting.updateMatchMakingChanges);
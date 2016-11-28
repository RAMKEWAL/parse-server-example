'use strict';
const ParseObject = Parse.Object.extend('MatchMakingSetting');
module.exports = {
    addMatchMakingSettings: addMatchMakingSettings,
    UpdateMatchMakingSettings: UpdateMatchMakingSettings,
    UpdateLocMatchMakingSettings: UpdateLocMatchMakingSettings,
    getMatchMakingSettingsbyId: getMatchMakingSettingsbyId,
    updateMatchMakingChanges: updateMatchMakingChanges
};
function addMatchMakingSettings(req, res) {
    var userinfo = req.params.userinfo;
    var MatchMakingSetting = Parse.Object.extend("MatchMakingSetting");
    var person = new MatchMakingSetting();
    person.set('userid', {"__type": "Pointer", "className": "_User", "objectId": userinfo.userid});
    person.set('location', userinfo.location);
    person.set('address', userinfo.address);
    person.set('distance', userinfo.distance);
    person.set('distanceType', userinfo.distanceType);
    person.set('guys', userinfo.guys);
    person.set('girls', userinfo.girls);
    person.set('ageFrom', userinfo.ageFrom);
    person.set('heightMin', userinfo.heightMin);
    person.set('heightMax', userinfo.heightMax);
    person.set('ageTo', userinfo.ageTo);
    person.set('photoOnly', userinfo.photoOnly);
    person.set('onlineOnly', userinfo.onlineOnly);
    person.set('bodyType', userinfo.bodyType);
    person.set('maritalStatus', userinfo.maritalStatus);
    person.set('faith', userinfo.faith);
    person.set('ethnicity', userinfo.ethnicity);
    person.set('political', userinfo.political);
    person.set('education', userinfo.education);
    person.set('smoke', userinfo.smoke);
    person.set('drink', userinfo.drink);
    person.set('drugs', userinfo.drugs);
    person.set('excercise', userinfo.excercise);
    person.set('children', userinfo.children);
    person.set('pets', userinfo.pets);
    person.save(null, {
        success: function (person) {
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}

function UpdateMatchMakingSettings(req, res) {
    var userid = req.params.userid;
    var userinfo = req.params.userinfo;
    new Parse.Query('MatchMakingSetting')
            .equalTo('userid', {"__type": "Pointer", "className": "_User", "objectId": userid})
            .first({useMasterKey: true}).then(objUser => {
        objUser.set('guys', userinfo.guys);
        objUser.set('girls', userinfo.girls);
        return objUser.save(null, {useMasterKey: true});
    }).then(success => res.success(success), error => res.error(error.message));
}

function UpdateLocMatchMakingSettings(req, res) {
    var userid = req.params.userid;
    var location = req.params.location;
    var address = req.params.address;
    new Parse.Query('MatchMakingSetting')
            .equalTo('userid', {"__type": "Pointer", "className": "_User", "objectId": userid})
            .first({useMasterKey: true}).then(objUser => {
        objUser.set('location', location);
        objUser.set('address', address);
        return objUser.save(null, {useMasterKey: true});
    }).then(success => res.success(success), error => res.error(error.message));
}

function getMatchMakingSettingsbyId(req, res) {
    var userid = req.params.userid;
    var query = new Parse.Query('MatchMakingSetting');
    query.equalTo("userid", {"__type": "Pointer", "className": "_User", "objectId": userid});
    query.find({useMasterKey: true})
            .then(results => res.success(results || {}), error => res.error(error.message));
}
function updateMatchMakingChanges(req, res) {
    var userid = req.params.userid;
    var userinfo = req.params.userinfo;
    new Parse.Query('MatchMakingSetting')
            .equalTo('userid', {"__type": "Pointer", "className": "_User", "objectId": userid})
            .first({useMasterKey: true}).then(objUser => {
        objUser.set('location', userinfo.location);
        objUser.set('address', userinfo.address);
        objUser.set('guys', userinfo.guys);
        objUser.set('girls', userinfo.girls);
        objUser.set('distance', userinfo.distance);
        objUser.set('ageFrom', userinfo.ageFrom);
        objUser.set('heightMin', userinfo.heightMin);
        objUser.set('heightMax', userinfo.heightMax);
        objUser.set('ageTo', userinfo.ageTo);
        objUser.set('photoOnly', userinfo.photoOnly);
        objUser.set('onlineOnly', userinfo.onlineOnly);
        objUser.set('bodyType', userinfo.bodyType);
        objUser.set('maritalStatus', userinfo.maritalStatus);
        objUser.set('faith', userinfo.faith);
        objUser.set('ethnicity', userinfo.ethnicity);
        objUser.set('political', userinfo.political);
        objUser.set('education', userinfo.education);
        objUser.set('smoke', userinfo.smoke);
        objUser.set('drink', userinfo.drink);
        objUser.set('drugs', userinfo.drugs);
        objUser.set('excercise', userinfo.excercise);
        objUser.set('children', userinfo.children);
        objUser.set('pets', userinfo.pets);
        return objUser.save(null, {useMasterKey: true});
    }).then(success => res.success(success), error => res.error(error.message));
}


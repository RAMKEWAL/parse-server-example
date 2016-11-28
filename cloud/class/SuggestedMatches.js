'use strict';
const ParseObject = Parse.Object.extend('SuggestedMatches');
module.exports = {
    saveSuggestedInfo: saveSuggestedInfo,
    getSuggestedMatches : getSuggestedMatches,
    saveBothSuggestedMatches : saveBothSuggestedMatches,
    saveMaleSuggestedMatches : saveMaleSuggestedMatches,
    saveFemaleSuggestedMatches : saveFemaleSuggestedMatches
};

// for connect
function saveSuggestedInfo(req, res) {
    var suggestinfo = req.params.suggestinfo;
    var id = req.params.id;
    var whoSuggestedName = req.params.whoSuggestedName;
    var whoSuggested = {"__type": "Pointer", "className": "_User", "objectId": id};
    var suggestedPerson = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.suggestedId};
    var SuggestedTo = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.friendId};
    var SuggestedMatches = Parse.Object.extend("SuggestedMatches");
    var person = new SuggestedMatches();

    person.set('whoSuggested', whoSuggested);
    person.set('suggestedPerson', suggestedPerson);
    person.set('SuggestedTo', SuggestedTo);
    person.set('whoSuggestedName', whoSuggestedName);
    person.save(null, {
        success: function (person) {
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}
// for match making
function saveBothSuggestedMatches(req,res){
    var suggestinfo = req.params.suggestinfo;
    var id = req.params.id;
    var whoSuggestedName = req.params.whoSuggestedName;
    var whoSuggested = {"__type": "Pointer", "className": "_User", "objectId": id};
    var suggestedPerson = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.female.id};
    var SuggestedTo = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.male.id};
    var SuggestedMatches = Parse.Object.extend("SuggestedMatches");
    var person = new SuggestedMatches();

    person.set('whoSuggested', whoSuggested);
    person.set('suggestedPerson', suggestedPerson);
    person.set('SuggestedTo', SuggestedTo);
    person.set('whoSuggestedName', whoSuggestedName);
    person.save(null, {
        success: function (person) {
            saveOtherSuggestedMatches(suggestinfo,id,whoSuggestedName);
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}
function saveOtherSuggestedMatches(suggestinfo,id,whoSuggestedName){
    var whoSuggested = {"__type": "Pointer", "className": "_User", "objectId": id};
    var suggestedPerson = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.male.id};
    var SuggestedTo = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.female.id};
    var SuggestedMatches = Parse.Object.extend("SuggestedMatches");
    var person = new SuggestedMatches();

    person.set('whoSuggested', whoSuggested);
    person.set('suggestedPerson', suggestedPerson);
    person.set('SuggestedTo', SuggestedTo);
    person.set('whoSuggestedName', whoSuggestedName);
    person.save(null, {
        success: function (person) {
            console.log(person);
        },
        error: function (error) {
             console.log(error);
        }
    });
}

function saveMaleSuggestedMatches(req,res){
    var suggestinfo = req.params.suggestinfo;
    var id = req.params.id;
    var whoSuggestedName = req.params.whoSuggestedName;
    var whoSuggested = {"__type": "Pointer", "className": "_User", "objectId": id};
    var suggestedPerson = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.female.id};
    var SuggestedTo = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.male.id};
    var SuggestedMatches = Parse.Object.extend("SuggestedMatches");
    var person = new SuggestedMatches();

    person.set('whoSuggested', whoSuggested);
    person.set('suggestedPerson', suggestedPerson);
    person.set('SuggestedTo', SuggestedTo);
    person.set('whoSuggestedName', whoSuggestedName);
    person.save(null, {
        success: function (person) {
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}

function saveFemaleSuggestedMatches(req,res){
    var suggestinfo = req.params.suggestinfo;
    var id = req.params.id;
    var whoSuggestedName = req.params.whoSuggestedName;
    var whoSuggested = {"__type": "Pointer", "className": "_User", "objectId": id};
    var suggestedPerson = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.male.id};
    var SuggestedTo = {"__type": "Pointer", "className": "_User", "objectId": suggestinfo.female.id};
    var SuggestedMatches = Parse.Object.extend("SuggestedMatches");
    var person = new SuggestedMatches();

    person.set('whoSuggested', whoSuggested);
    person.set('suggestedPerson', suggestedPerson);
    person.set('SuggestedTo', SuggestedTo);
    person.set('whoSuggestedName', whoSuggestedName);
    person.save(null, {
        success: function (person) {
            res.success(person);
        },
        error: function (error) {
            res.error(error);
        }
    });
}
function getSuggestedMatches(req,res){
    var id = req.params.id;
       new Parse.Query("SuggestedMatches")
        .equalTo('SuggestedTo', {"__type":"Pointer","className":"_User","objectId":id})
        .find({useMasterKey: true})
        .then(results => res.success(results || {}), error=> res.error(error.message));
}

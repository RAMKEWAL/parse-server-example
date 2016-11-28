'use strict';

const GalleryActivity = require('./../class/User');
const ParseObject     = Parse.Object.extend('Interests');
module.exports        = {
    getAllInterests       : getAllInterests
};

function getAllInterests(req,res){
        var query = new Parse.Query("Interests");
         query.limit(308).find({useMasterKey: true})
        .then(results => res.success(results || {}), error => res.error(error.message));
}

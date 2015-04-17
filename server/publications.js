Meteor.publish('publish', function(name, filter) {
    return Mongo.Collection.get(name).find(filter);
});

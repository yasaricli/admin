Meteor.publish('publish', function(name, filter) {
  // find(selector, options)
  return Mongo.Collection.get(name).find({}, filter);
});

Template.adminCollectionInsert.events({});
Template.adminCollectionUpdate.events({});
Template.adminButtons.events({
  'click .adminRemoveButton': function(event, template) {
    var collection = Mongo.Collection.get(this.admin._name);
    if (collection) {
      collection.remove(this.doc._id, function(err) {
        if (!err) {
          Router.go('AdminCollection', { name: collection._name });
        }
      });
    }
    event.preventDefault();
  }
});

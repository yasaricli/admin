Template.adminCollectionInsert.events({});
Template.adminCollectionUpdate.events({});
Template.adminHeader.events({
  'click .logout': function() {
    Meteor.logout();
  }
});

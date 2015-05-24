Template.adminCollectionInsert.events({});
Template.adminCollectionUpdate.events({});
Template.adminHeader.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});

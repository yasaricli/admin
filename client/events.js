Template.adminCollection.events({
  'click .admin-list-fields .admin-filter': function(event, t) {
    var admin = t.data.admin(),
        sort = { };

    // set sorts may be specified using your choice of several syntaxes
    sort[this.key] = admin.getOption('sort', this.key) == 1 ? -1 : 1;

    // set Sort option
    return admin.setOption('sort', sort);
  },

  /*
   * Clear Filter all empty.
   * */
  'click .admin-filter-clear': function(event, t) {
    event.stopPropagation();
    t.data.admin().resetOption('sort');
  }
});

Template.adminHeader.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});

// INSERT UPDATE
Template.adminCollectionInsert.events({});
Template.adminCollectionUpdate.events({});

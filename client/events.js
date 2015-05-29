Template.adminCollection.events({
  'click .admin-list-fields .admin-filter': function(event, t) {
    var admin = t.data.admin(),
        sortKey = '-' + this.key; // mapper { sort.key: (1 or -1) }

    // contains search sort key
    if (_.contains(admin.getOption('sort'), this.key)) {

      // set sortKey
      return admin.setOption('sort', [sortKey]);
    }

    // set default sort
    return admin.setOption('sort', [this.key]);
  },

  /*
   * Clear Filter all empty.
   * */
  'click .admin-filter-clear': function(event, t) {
    event.stopPropagation();
    // set clear sort options.
    t.data.admin().setOption('sort', []);
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

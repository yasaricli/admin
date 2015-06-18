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
  },

  'click .adminRemoveButton': function(event, t) {
    var admin = this.admin();

    // all each ids and remove document
    _.each(admin.getOption('list_selectedIds'), function(_id) {
      admin.cursor.remove(_id);
    });

    // and reset option
    admin.setOption('list_selectedIds', []);
  },

  /*
   * Remove selected doc events
   * */
  'k_checked .select-doc': function(event, t) {
    var self = this;
    t.data.admin().widthOption(function(doc, dep) {
      doc.list_selectedIds.push(self.doc._id);
      dep.changed();
    });
  },

  'k_unchecked .select-doc': function(event, t) {
    var admin = t.data.admin(),
        without = _.without(admin.getOption('list_selectedIds'), this.doc._id);
    admin.setOption('list_selectedIds', without);
  },
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

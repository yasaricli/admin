var Helpers = {
  session: function(key) {
    return Session.get(key);
  },
  is: function(a, b) {
    return a == b;
  }
};

_.each(Helpers, function(fn, name) {
  Template.registerHelper(name, fn);
});

// TEMPLATE HELPERS
Template.adminHeader.helpers({
  collections: function() {
    return Collections();
  }
});

Template.adminCollection.helpers({
  getValue: function(doc) {
    return doc[this.key];
  },
  isBoolean: function() {
    return this.type == 'Boolean';
  },

  // XXX: Meteor next version @index @first @last
  setIndex: function(list) {
    return _.map(list, function(doc, index) {
      return _.extend({
        index: index,
        first: index == 0,
        last: index == (list.length -1)
      }, doc);
    });
  }
});

Template.adminDashboard.helpers({
  collections: function() {
    return Collections();
  },
  count: function(filter) {
    var filter = filter || {};
    return this.instance.find(filter).count();
  },
  admin: function() {
    return this.instance._admin;
  }
});

Template.adminPagination.helpers({
  pages: function() {
    return this.pagination().pages();
  }
});

Template.adminButtons.helpers({
  onSuccess: function() {
    var self = this;
    return function() {
      Router.go('AdminCollection', { name: self.admin._name });
    }
  }
});

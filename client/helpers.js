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

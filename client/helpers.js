Template.adminHeader.helpers({});
Template.adminCollection.helpers({});

Template.adminDashboard.helpers({
  count: function(filter) {
    var filter = filter || {};
    return this.instance.find(filter).count();
  }
});

Template.adminPagination.helpers({
  pages: function() {
    return this.pagination().pages();
  }
});

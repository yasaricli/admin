Template.adminSignInForm.onRenderedFocus(function() {});
Template.adminCollectionInsert.onRenderedFocus(function() {});
Template.adminCollectionUpdate.onRenderedFocus(function() {});

/*
 * On destroyed collection template remove selected documents.
 * */
Template.adminCollection.onDestroyed(function() {
  this.data.admin().setOption('list_selectedIds', []);
});

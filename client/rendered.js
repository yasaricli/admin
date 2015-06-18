Template.adminSignInForm.onRenderedFocus(function() {});
Template.adminCollectionInsert.onRenderedFocus(function() {});
Template.adminCollectionUpdate.onRenderedFocus(function() {});

Template.adminCollection.onRendered(function() {
    this.$("input").kalypto();
});

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'Index',
  waitOn: function() {
    return Meteor.subscribe('styles');
  }
});

Template.styles.helpers({
  styles: function() {
    return Styles.find({ });
  }
});

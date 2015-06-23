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

Router.route('/tutorial', {
  name: 'Tutorial'
});

Router.route('/docs', {
  name: 'Docs'
});

Template.styles.helpers({
  styles: function() {
    return Styles.find({ });
  }
});

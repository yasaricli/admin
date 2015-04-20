Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'Home',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Template.home.helpers({
  posts: function() {
    return Posts.find({ });
  }
});

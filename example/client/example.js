Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'Home'
});

Template.home.helpers({
  posts: function() {
    return Posts.find();
  },
  categories: function() {
    return Categories.find();
  }
});

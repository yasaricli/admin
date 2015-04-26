Admin.configure({
  title: 'Blog Admin'
});

Router.route('/', {
  name: 'Posts'
});

Template.posts.helpers({
  posts: function() {
    return Posts.find({}, { sort: { createdAt: -1 }});
  }
});

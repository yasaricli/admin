Meteor.publishComposite('posts', {
  find: function() {
    return Posts.find({ });
  },
  children: [
    {
      find: function(post) {
        return Tags.find({ });
      }
    }
  ]
});

Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: { type: String, max: 200 },
  createdAt: { type: Date, denyUpdate: true },
  content: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'froala',
        inlineMode: false
      }
    }
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      options: function() {
        return Tags.find({ }).map(function(t) {
          return { label: t.title, value: t._id };
        });
      }
    }
  }
}));

Posts.attachAdmin({
    name: 'Posts',
    list_display: ['title'],
    sort: ['-createdAt'],
    security: true,
    list_per_page: 5,
    verbose_name: 'Post'
});

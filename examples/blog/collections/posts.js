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
  tagIds: {
    type: [String],
    optional: true,
    label: 'Tags',
    autoform: {
      options: function() {
        return Tags.find({ }).map(function(t) {
          return { label: t.title, value: t._id };
        });
      }
    }
  },
  active: {
    type: Boolean
  }
}));

Posts.helpers({
  tags: function() {
    return Tags.find({ _id: { $in: this.tagIds }});
  }
});

Posts.attachAdmin({
  name: 'Posts',
  list_display: ['title', 'active'],
  sort: ['-createdAt'],
  security: true,
  list_per_page: 5,
  verbose_name: 'Post',
  subscriptions: {
    tags: { }
  }
});

Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    label: 'title',
    type: String,
    max: 200
  },

  content: {
    label: 'Content',
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
    label: 'Select Tags',
    optional: true,
    autoform: {
      options: function() {
        return Tags.find().map(function(t) {
          return { label: t.name, value: t._id };
        })
      }
    }
  }
}));


Posts.attachAdmin(new Admin({
  name: 'Posts',
  list_display: ['title'],
  security: true, // insert, remove, update role in admin.
  subscriptions: {
    tags: {}
  }
}));


Posts.helpers({
  tags: function() {
    return Tags.find({ _id: { $in: this.tagIds } });
  }
});

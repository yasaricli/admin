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
  }
}));


Posts.attachAdmin(new Admin({
  name: 'Posts',
  list_display: ['title']
}));

Tags = new Mongo.Collection('tags');

Tags.attachSchema(new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    max: 200
  }
}));

Tags.attachAdmin(new Admin({
  name: 'Tags',
  security: true // insert, remove, update role in admin.
}));

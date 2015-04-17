Categories = new Mongo.Collection('categories');

Categories.attachSchema(new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    max: 200
  }
}));

Categories.attachAdmin(new Admin({
  name: 'Categories',
  security: true // insert, remove, update role in admin.
}));

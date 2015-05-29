Tags = new Mongo.Collection('tags');

Tags.attachSchema(new SimpleSchema({
  title: { type: String, max: 50 },
  createdAt: { type: Date, denyUpdate: true }
}));

Tags.attachAdmin({
    name: 'Tags',
    list_display: ['title'],
    sort: { createdAt: -1 },
    security: true,
    list_per_page: 10,
    verbose_name: 'Tag'
});

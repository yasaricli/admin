Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
  title: { type: String, label: "Title", max: 200 },
  author: { type: String, label: "Author" },
  copies: { type: Number, label: "Number of copies", min: 0 },
  createdAt: { type: Date, denyUpdate: true },
  summary: { type: String, label: "Brief summary", optional: true, autoform: { type: 'textarea' } }
}));


// HOOKS
Books.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Books.attachAdmin({
  name: 'Books',
  list_display: ['title', 'author', 'copies'],
  sort: { createdAt: -1 },
  security: true,
  list_per_page: 4,
  verbose_name: 'Book'
});

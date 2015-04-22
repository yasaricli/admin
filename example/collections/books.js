Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
    title: { type: String, label: "Title", max: 200 },
    author: { type: String, label: "Author" },
    copies: { type: Number, label: "Number of copies", min: 0 },
    summary: { type: String, label: "Brief summary", optional: true, autoform: { type: 'textarea' } }
}));

Books.attachAdmin({
    name: 'Books',
    list_display: ['title', 'author', 'copies'],
    sort: ['-copies'],
    security: true,
    list_per_page: 2
});

Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
    title: { type: String, label: "Title", max: 200 },
    author: { type: String, label: "Author" },
    copies: { type: Number, label: "Number of copies", min: 0 },
    lastCheckedOut: { type: Date, label: "Last date this book was checked out", optional: true },
    summary: { type: String, label: "Brief summary", optional: true, max: 1000 }
}));


Books.attachAdmin(new Admin({
    name: 'Books',
    list_display: ['title', 'author', 'copies'],
    sort: ['-lastCheckedOut'],
    security: true
}));

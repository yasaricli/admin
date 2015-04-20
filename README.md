admin 
======

## Quick Start
You can install yasaricli:admin using Meteor's package management system:

```bash
> meteor add yasaricli:admin
```

### Admin Specific Options
In this example we'll omit the admin provide an options
object. The options object will explain each of the possible options.

```javascript
new Admin({
  
  list_display: [],
  exclude: [],
  sort: [],
  
  // Pagination
  list_per_page: 10,
  
  // security
  role: 'admin',
  security: false,
  permit: ['insert', 'update', 'remove'],
  
  subscriptions: {}
});
```
## Attaching a Schema and Admin to a Collection

```js
Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
    title: { type: String, label: "Title", max: 200 },
    author: { type: String, label: "Author" },
    copies: { type: Number, label: "Number of copies", min: 0 },
    summary: { type: String, label: "Brief summary", optional: true, autoform: { type: 'textarea' }}
}));

Books.attachAdmin(new Admin({
    name: 'Books',
    list_display: ['title', 'author'],
    sort: ['-lastCheckedOut'],
    security: true,
    list_per_page: 5
}));
```

#### /admin list books
![books](http://i.imgur.com/5fpi8Nn.png)

#### /admin update book
![books](http://i.imgur.com/2wRgXjh.png)

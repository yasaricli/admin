
## Examples
Meteor deployed applications 

[Blog APP](http://admin-blog.meteor.com)

[Books APP](http://admin-books.meteor.com)


## Quick Start
You can install yasaricli:admin using Meteor's package management system:

```bash
> meteor add yasaricli:admin
```

## Configuring the Admin
```javascript
Admin.configure({
  title: 'Books Admin'
});
```
## Attaching a Schema and Admin to a Collection

```javascript
Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
    title: { type: String, label: "Title", max: 200 },
    author: { type: String, label: "Author" },
    copies: { type: Number, label: "Number of copies", min: 0 },
    summary: { type: String, label: "Brief summary", optional: true, autoform: { type: 'textarea' }}
}));

Books.attachAdmin({
    name: 'Books',
    list_display: ['title', 'author', 'copies'],
    sort: ['-copies'],
    security: true,
    list_per_page: 5,
    verbose_name: 'Book',
});
```

### Admin Specific Options
In this example we'll omit the admin provide an options
object. The options object will explain each of the possible options.

```javascript
ATTACH_ADMIN_OPTIONS = {

  sort: {},
  list_display: [],
  exclude: [],
  subscriptions: {},
  verbose_name: null,

  // Pagination
  list_per_page: 10,

  // security
  security: false,
  role: 'admin',
  permit: ['insert', 'update', 'remove']
  
};

OPTIONS = {
  title: 'Meteor Admin'
};
```

Meteor Admin
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
  
  // security
  role: 'admin',
  security: false,
  permit: ['insert', 'update', 'remove'],
  
  subscriptions: {}
});
```

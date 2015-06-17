admin 
======

A work in progress simple meteor admin application which aims to provide basic
collection management functionality similiar to django admin with minimal interface. 

Admin uses collections to be registered and requires their SimpleSchemas 
created beforehand so it is required for users to have their SimpleSchames ready
for their collections.

Upon registration a collection becomes available for meteor admin to work with.
Basic operations supported by meteor admin, enabling users to list, create, sort etc on
documents from collections.

All admin related subsciptions for registered collections can be managed in subsciptions
property during attachment. It is up to user to decide how many relations should be
used in admin panel for that collection.

## Quick Start
You can install yasaricli:admin using Meteor's package management system:



```bash
> meteor add yasaricli:admin
```

## The Admin Guide
Detailed explanations of features and configuration options can be found in the [Guide](https://github.com/yasaricli/admin/blob/master/Guide.md).

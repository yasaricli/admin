## v.NEXT

* `Search` Collection Page
* remove items open to lightbox `Yes` or `No`

## 0.4.0
* Refactoring css and html ids.
* Admin styles package `yasaricli:admin-styles`
* Template styles `default(Black)`, `navy`, `blue`, `yellow`.
* Admin `configure` add to `style:'default'` property.
  
  ### Style property

```javascript
Admin.configure({
  title: 'Books Admin',
  style: 'yellow' // default
});
```

## 0.3.0
* `Admin.createAdmin(<email>, <password>)` command
* `Admin.setAdminRole(<userId>)` command

  ### Example: 
    Run the `meteor shell` command and:
    
    Set admin role 
    
        $ > userId = Users.findOne(); // _id: q32aNMDsNbaS6MhpC
        $ > Admin.setAdminRole(userId);
        
    Create new admin
    
        $ > Admin.createAdmin('yasaricli@gmail.com', '1234567');
        
## 0.2.0_1
* Document `selectedIds` list `destroy` template fixed.
* `Exclude` collection fields fixed.

## 0.2.0
* list page select  `select remove checkbox doc`.
* Package rename `(zimme:active-route)`
* Update packages `iron:router@1.0.9`, `aldeed:autoform@5.3.0`, `useraccounts:core@1.11.1`, `useraccounts:unstyled@1.11.1`
* onSuccess `edit, insert, remove this.collection._name fixed`.

## 0.1.0_1

* `Sort` array types deprecated change to Object.
* `Pagination` `currentPage` and `totalPage` fixed
* `resetOption` new property.


## 0.1.0

* `Filter` Clicked to apply sort in the list page.
* new `Tracker.Dependency` Collection _admin property.
* `setOption(<option>, value)`, `getOption(<option>)` It added **features** and completely **reactive!**

## 0.0.9_3

* The page can not be selected if no default page. #1 fixed

## 0.0.9_2

* getValue type array length fixed.

## 0.0.9_1

* if the `list_display` then show the `length` of `array`.

## 0.0.9 

* Change admin `password`
* `exclude` This attribute, if given, should be a list of field names to exclude from the form.
* `AdminLayout` css color changed
* `Subscriptions` bugfix
* Examples add `books` application
* Examples add `blog` application

## 0.0.8 

* added admin options `verbose_name`
* removed `adminButtons` template and `helpers`.

## 0.0.7

* added `aldeed:delete-button` package and update buttons.
* list table change font size `14px`.
* example `list_per_page` change to `4`.
* `isPage` helper removed.
* add to `is` template helper `{{# if is 'a' 'b' }} --> true`.
* add Meteor-provided package to `tracker`

## 0.0.6_1

* `Admin.ATTACH_ADMIN_OPTIONS` clone bugfix

## 0.0.6

* new `Admin` Object
* `Admin.configure(<options>)` method added.
* `adminOptions` Template tag added.
* `SimpleSchema` not defined bugfix.
* Export `Admin` and `SimpleSchema` Object

## 0.0.5

* `attachAdmin` method refactor.
* DERECATED `new Admin({})`
* A new `attachAdmin` object `Collection.attachAdmin(<options>)` is updated.
* added `utils.js` file.
* example application updated deploy `metadmin.meteor.com`

## 0.0.4_1

* `loadingTemplate` fixed.
* `adminSignInForm` Auto Focus

## 0.0.4

* Dashboard display
* Pages total collection count
* **/admin** `adminSignInForm` login admin form
* `useraccounts:core` and `useraccounts:unstyled` packages added
* RegisterHelpers getSession `session` tag add.
* Header admin email click to logout.

## 0.0.3

* removed `createAdminUser` and `defineClient` methods
* removed layout template `adminLayoutSafe`
* schema `_.omit` change to `_.pick` `list_display`

## 0.0.2_1

* Pagination `totalPages` perPage fixed.

## 0.0.2

* Dashboard `allSubscriptions` fixed.

## 0.0.1

* **İnsert**, **Update**, **Remove** Docs.
* Pagination
* Subscriptions
* Security `ongoworks:security`
* Roles `alanning:roles`

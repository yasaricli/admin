### NEXT

* Search collection
* Filter

### 0.0.8 
* Change admin password

### 0.0.7
* added `aldeed:delete-button` package and update buttons.
* list table change font size `14px`.
* example `list_per_page` change to `4`.
* `isPage` helper removed.
* add to `is` template helper `{{# if is 'a' 'b' }} --> true`.
* add Meteor-provided package to `tracker`

### 0.0.6_1
* `Admin.ATTACH_ADMIN_OPTIONS` clone bugfix

### 0.0.6
* new `Admin` Object
* `Admin.configure(<options>)` method added.
* `adminOptions` Template tag added.
* `SimpleSchema` not defined bugfix.
* Export `Admin` and `SimpleSchema` Object

### 0.0.5
* `attachAdmin` method refactor.
* DERECATED `new Admin({})`
* A new `attachAdmin` object `Collection.attachAdmin(<options>)` is updated.
* added `utils.js` file.
* example application updated deploy `metadmin.meteor.com`

### 0.0.4_1
* `loadingTemplate` fixed.
* `adminSignInForm` Auto Focus

### 0.0.4 
* Dashboard display
* Pages total collection count
* **/admin** `adminSignInForm` login admin form
* `useraccounts:core` and `useraccounts:unstyled` packages added
* RegisterHelpers getSession `session` tag add.
* Header admin email click to logout.

### 0.0.3
* removed `createAdminUser` and `defineClient` methods
* removed layout template `adminLayoutSafe`
* schema `_.omit` change to `_.pick` `list_display`

### 0.0.2_1
* Pagination `totalPages` perPage fixed.

### 0.0.2
* Dashboard `allSubscriptions` fixed.

### 0.0.1
* **İnsert**, **Update**, **Remove** Docs.
* Pagination
* Subscriptions
* Security `ongoworks:security`
* Roles `alanning:roles`

var AD, OPTIONS;

/*
 * The default object will be formed for each collection.
 * After the object consists of elements changed or deleted.
 * */
OPTIONS = function(options) {
  /*
   * A Dependency represents an atomic unit of reactive data that a
   * computation might depend on. Reactive data sources such as Session or
   * Minimongo internally create different Dependency objects for different
   * pieces of data, each of which may be depended on by multiple computations.
   * When the data changes, the computations are invalidated.
   * */
  var dep = new Tracker.Dependency();

  this.sort = {};
  this.list_display = [];
  this.list_selectedIds = [];
  this.exclude = [];
  this.subscriptions = {};
  this.verbose_name = null;

  // Pagination
  this.list_per_page = 10;

  // security
  this.security = false;
  this.role = 'admin';
  this.permit = ['insert', 'update', 'remove'];

  /*
   * Options are supposed to bring reactive reach to all the features.
   * Property getOption if we take the method everything is reactive.
   * */
  this.getOption = function(key, value) {
    dep.depend();
    return value ? this[key][value] : this[key];
  };

  /*
   * If we want to change the template changes we need to do it that way,
   * If not reactive.
   * */
  this.setOption = function(key, value) {
    this[key] = value;
    dep.changed();
  };

  this.widthOption = function(callback) {
    return callback(this, dep);
  };

  /*
   * It adds the object to the desired default option.
   * */
  this.resetOption = function(key) {
    this[key] = this.originalOptions[key];
    dep.changed();
  };

  // Extend options instance.
  _.extend(this, options);

  // Original Instance
  this.originalOptions = options;
};

/*
 * And subsequent management of all settings to change to the
 * object manager that all everything configured.
 * */
AD = function Admin() {
  var self = this;

  // default false
  this._initialized = false;

  this.OPTIONS = {
    title: 'Meteor Admin'
  };

  this.HELPERS = {
    adminOptions: function() {
      return self.OPTIONS;
    }
  };

  this.configure = function(config) {
    this.OPTIONS = _.defaults(config, this.OPTIONS);
  };

  this._init = function() {
    if (this._initialized) return;

    // client side
    isClient(function() {

      // Register Helpers
      _.each(this.HELPERS, function(fn, name) {
        Template.registerHelper(name, fn);
      });
    }, this);

    // server side
    isServer(function() {

    });

    // Admin as initialized
    this._initialized = true;
  };
};

Admin = new AD();

// Initialization
Meteor.startup(function() {
  Admin._init();
});

/*
 * Mongo.Collection.prototype.attachAdmin
 * Admin object passed to its constructor.
 * */
Mongo.Collection.prototype.attachAdmin = function attachAdmin(options) {
  var schema = this.simpleSchema();

  // Let's add a collection of admin features.
  this._admin = _admin = new OPTIONS(options);

  // Cursor collection this.
  this._admin.cursor = this;

  // adding the default subscriber will deliver to subscribe.
  this._admin.subscriptions[this._name] = {};

  // array of change to object types.
  this._admin.setOption('sort', _admin.getOption('sort'));

  // Default collection self name.
  this._admin.setOption('_name', this._name);

  // We exclude the default fields. And we are creating a clean object.
  this._admin.setOption('list_display', _.pick(schema._schema, _admin.getOption('list_display')));

  // if verbose_name null then set to this collection name.
  if (!this._admin.getOption('verbose_name')) {
    this._admin.setOption('verbose_name', this._name);
  }

  this._admin.fields = _.map(_admin.list_display, function(doc, key) {
    var name = doc.label ? doc.label : key;
    return _.extend({ name: name, type: doc.type.name, key: key }, _.omit(doc, 'type'));
  });

  // Our code to run the server-side
  isServer(function() {

    // If we do, we find and set security roles.
    if (_admin.getOption('security')) {
      this.permit(_admin.getOption('permit')).ifHasRole(_admin.getOption('role')).apply();
    }
  }, this);
};

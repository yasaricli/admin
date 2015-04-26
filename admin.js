var AD = function Admin() {
  var self = this;

  // defauşt false
  this._initialized = false;

  this.ATTACH_ADMIN_OPTIONS = {
    sort: {},
    list_display: [],
    subscriptions: {},
    verbose_name: null,

    // Pagination
    list_per_page: 10,

    // security
    security: false,
    role: 'admin',
    permit: ['insert', 'update', 'remove']
  };

  this.OPTIONS = {
    title: 'Meteor Admin'
  };

  this.HELPERS = {
    adminOptions: function() {
      return self.OPTIONS;
    },
    session: function(key) {
      return Session.get(key);
    },
    is: function(a, b) {
      return a == b;
    },
    onRemoveSuccess: function() {
      var self = this;
      return function() {
        Router.go('AdminCollection', { name: self.admin()._name });
      }
    }
  };

  this.configure = function(config) {
    this.OPTIONS = _.defaults(config, this.OPTIONS);
  };

  this.isServer = function(callback) {
    return Meteor.isServer && callback.call(this);
  };

  this.isClient = function(callback) {
    return Meteor.isClient && callback.call(this);
  };

  this._init = function() {
    if (this._initialized) return;

    // client side
    this.isClient(function() {

      // Register Helpers
      _.each(this.HELPERS, function(fn, name) {
        Template.registerHelper(name, fn);
      });
    });

    // server side
    this.isServer(function() {

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
  this._admin = _admin = _.extend(_.clone(Admin.ATTACH_ADMIN_OPTIONS), options);

  // adding the default subscriber will deliver to subscribe.
  this._admin.subscriptions[this._name] = {};

  // array of change to object types.
  this._admin.sort = cleanSort(_admin.sort);

  // Default collection self name.
  this._admin._name = this._name;

  // We exclude the default fields. And we are creating a clean object.
  this._admin.list_display = _.pick(schema._schema, _admin.list_display);

  // if verbose_name null then set to this collection name.
  if (!this._admin.verbose_name) {
    this._admin.verbose_name = this._name;
  }

  this._admin.fields = _.map(_admin.list_display, function(doc, key) {
    var name = doc.label ? doc.label : key;
    return _.extend({ name: name, type: doc.type.name, key: key }, _.omit(doc, 'type'));
  });

  this._admin.runSubscriptions = function() {
    return _.map(_admin.subscriptions, function(filter, name) {
      return Meteor.subscribe('publish', name, filter);
    });
  };

  // Our code to run the server-side
  if (Meteor.isServer) {

    // If we do, we find and set security roles.
    if (_admin.security) {
      this.permit(_admin.permit).ifHasRole(_admin.role).apply();
    }
  }
};

var DEFAULT_OPTIONS = {
  sort: {},
  list_display: [],
  subscriptions: {},

  // Pagination
  list_per_page: 10,

  // security
  security: false,
  role: 'admin',
  permit: ['insert', 'update', 'remove'],
};

/*
 * Mongo.Collection.prototype.attachAdmin
 * Admin object passed to its constructor.
 * */
Mongo.Collection.prototype.attachAdmin = function attachAdmin(options) {
  var schema = this.simpleSchema();

  // Let's add a collection of admin features.
  this._admin = _admin = _.extend(DEFAULT_OPTIONS, options);

  // adding the default subscriber will deliver to subscribe.
  this._admin.subscriptions[this._name] = {};

  // array of change to object types.
  this._admin.sort = cleanSort(_admin.sort);

  // Default collection self name.
  this._admin._name = this._name;

  // We exclude the default fields. And we are creating a clean object.
  this._admin.list_display = _.pick(schema._schema, _admin.list_display);

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

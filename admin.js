 // Establish the root object, `window` in the browser, or `exports` on the server.
var root = this;

// defined on an method belong to it.
defineServer = function(name, fn) {
  if (Meteor.isServer) {
    root[name] = fn;
  }
};

// Returned Collections instance _admin.
root.Collections = function() {
  return _.filter(Mongo.Collection.getAll(), function(doc) {
      return _.has(doc.instance, '_admin');
  });
};

// all subscriptions Collections list.
root.allSubscriptions = function() {
  return _.map(Collections(), function(coll) {
    return coll.instance._admin.subscriptions();
  });
};

root.cleanSort = function(sort) {
  var out = {};
  _.forEach(sort, function(name) {
    var clean = name.replace('-', '');
    out[clean] = name[0] == '-' ? -1 : 0;
  });
  return out;
};

root.Pagination = function(cursor, perPage) {
  this.cursor = cursor.fetch();
  this.perPage = perPage;

  this.collection = function(currentPage) {
    var currentPage = currentPage || 1;
    return this.cursor.slice((currentPage - 1) * this.perPage, currentPage * this.perPage);
  };

  this.totalPages = function() {
    var remainder = (this.cursor.length / perPage % 1),
        totalPages;
    if (remainder !== 0) {
      return (this.cursor.length / perPage - remainder + 1);
    }
    return (this.cursor.length / perPage);
  };
};

defineServer('createAdminUser', function(email, password) {
  var userId = Accounts.createUser({ email: email, password: password });

  // add roles
  if (userId) {
    Roles.addUsersToRoles(userId, ['admin']);
  }
});

root.AdminIronRouter = {
  layoutTemplate: 'adminLayout',
  loadingTemplate: 'adminLoading',
  waitOn: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name);
    if (collection && _.has(collection, '_admin')) { 
      return collection._admin.subscriptions();
    }
  },
  data: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name),
        cursor = collection.find(params.query, { sort: collection._admin.sort }),
        pagination = new Pagination(cursor, collection._admin.perPage);
    return {
      params: function() {
        return params;
      },
      admin: function() {
        return collection._admin;
      },
      doc: function() {
        return collection.findOne(params._id);
      },
      pagination: function() {
        return pagination;
      },
      collection: function() {
        return pagination.collection(params.page);
      }
    };
  },
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return this.next();
    }
    return this.render('adminWarningPage');
  }
};

root.Admin = function Admin(admin, options) {
  var self = this;

  // DEFAULTS
  this.list_display = [];
  this.exclude = [];

  this.sort = {};
  this.subscriptions = {};

  // Pagination
  this.list_per_page = 10;

  // security
  this.security = false;
  this.role = 'admin';
  this.permit = ['insert', 'update', 'remove'];

  // EXTEND OBJECT
  _.extend(this, admin);
};

/*
 * Mongo.Collection.prototype.attachAdmin
 * Admin object passed to its constructor.
 * */
Mongo.Collection.prototype.attachAdmin = function attachAdmin(options) {
  var self = this,
      simpleSchema = self.simpleSchema(),
      schema = _.omit(simpleSchema._schema, options.exclude);

  if (!simpleSchema) {
    throw new Error("Not found simpleSchema use attachSchema");
  }

  this._admin = _admin = _.pick(_.extend({ }, self), ['_name']);

  // default subscribe self collection name
  options.subscriptions[self._name] = {}

  // fields filter
  if (options.list_display.length) {
    schema = _.pick(simpleSchema._schema, options.list_display);
  }

  // sort
  _admin.sort = cleanSort(options.sort);

  // pagination list_per_page
  _admin.perPage = options.list_per_page;

  // Fields
  _admin.fields = _.map(schema, function(doc, key, list) {
    var name = doc.label ? doc.label : key;
    return _.extend({ name: name, type: doc.type.name, key: key }, _.omit(doc, 'type'));
  });

  // admin extra subscriptions
  _admin.subscriptions = function() {
    return _.map(options.subscriptions, function(filter, name, index) {
      return Meteor.subscribe('publish', name, filter);
    });
  };

  // set Collection Original name
  _admin.name = options.name;

  // Is server meteor
  if (Meteor.isServer) {

    // Clients may remove posts only if an admin user is logged in
    if (options.security) {
      self.permit(options.permit).ifHasRole(options.role).apply();
    }
  }
};

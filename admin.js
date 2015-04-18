var root = this;

root.Collections = function() {
  return _.filter(Mongo.Collection.getAll(), function(doc) {
      return _.has(doc.instance, '_admin');
  });
};

root.allSubscriptions = function() {
  var out = [],
      subscriptions = _.map(Collections(), function(coll) {
        return coll.instance._admin.subscriptions;
      });

  _.forEach(subscriptions, function(list) {
    _.forEach(list, function(sub) {
      out.push(sub);
    });
  });
  return out;
};

root.cleanSort = function(sort) {
  var out = {};
  _.forEach(sort, function(name) {
    var clean = name.replace('-', '');
    out[clean] = name[0] == '-' ? -1 : 0;
  });
  return out;
};

root.AdminIronRouterUtils = {
  layoutTemplate: 'adminLayout',
  loadingTemplate: 'adminLoading',
  waitOn: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name);
    if (collection && _.has(collection, '_admin')) { 
      return collection._admin.subscriptions;
    }
  },
  data: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name);
    return {
      admin: function() {
        return collection._admin;
      },
      doc: function() {
        return collection.findOne(params._id);
      },
      collection: function() {
        return collection.find(params.query, { sort: this.admin().sort });
      }
    };
  },
  onBeforeAction: function() {
    var collection = Mongo.Collection.get(this.params.name);

    if (!collection) {
      return this.render('adminUndefinedCollection');
    }

    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return this.next();
    }

    return this.render('adminLoginRequired');
  }
};

root.Admin = function Admin(admin, options) {
  var self = this;

  // DEFAULTS
  this.list_display = [];
  this.exclude = [];

  this.sort = {};
  this.subscriptions = {};

  // security
  this.security = false;
  this.role = 'admin';
  this.permit = ['insert', 'update', 'remove'];

  // EXTEND OBJECT
  _.extend(this, admin);
};

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

  // Fields
  _admin.fields = _.map(schema, function(doc, key, list) {
    var name = doc.label ? doc.label : key;
    return _.extend({ name: name, type: doc.type.name, key: key }, _.omit(doc, 'type'));
  });

  // admin extra subscriptions
  _admin.subscriptions = _.map(options.subscriptions, function(filter, name, index) {
    if (_.has(Meteor, 'subscribe')) {
      return Meteor.subscribe('publish', name, filter);
    }
  });

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

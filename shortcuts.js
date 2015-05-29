// Callback function. True if running in server environment.
isServer = function(callback, $this) {
  return Meteor.isServer && callback.call($this ? $this : this);
};

// Callback Function. True if running in client environment.
isClient = function(callback, $this) {
  return Meteor.isClient && callback.call($this ? $this : this);
};

// Returned Collections instance _admin.
getAllCollections = function() {
  return _.filter(Mongo.Collection.getAll(), function(doc) {
      return _.has(doc.instance, '_admin');
  });
};

// all subscriptions Collections list.
getAllSubscriptions = function() {
  return _.map(getAllCollections(), function(collection) {
    return Meteor.subscribe('publish', collection.name, {});
  });
};

cleanSort = function(sort) {
  var out = {};
  _.forEach(sort, function(name) {
    var clean = name.replace('-', '');
    out[clean] = name[0] == '-' ? -1 : 0;
  });
  return out;
};

getAdminCollection = function(name) {
  var coll = Mongo.Collection.get(name);
  if (coll && _.has(coll, '_admin')) {
    return coll._admin;
  }
};

Pagination = function(cursor, list_per_page) {
  this.cursor = cursor.fetch();
  this.list_per_page = list_per_page;
  this.currentPage = 1;

  this.page = function(page) {
    if (page) {
      this.currentPage = page;
    }
    return this.cursor.slice((this.currentPage - 1) * this.list_per_page, this.currentPage * this.list_per_page);
  };

  this.totalPages = function() {
    var remainder = (this.cursor.length / this.list_per_page % 1);
    if (remainder !== 0) {
      return (this.cursor.length / this.list_per_page - remainder + 1);
    }
    return (this.cursor.length / this.list_per_page);
  };

  this.pages = function() {
    return _.times(this.totalPages(), function(i) {
      return { page: ++i };
    });
  };

  this.count = function() {
    return this.cursor.length;
  };
};

IronRouterAdmin = {
  layoutTemplate: 'adminLayout',
  loadingTemplate: 'adminLoading',
  waitOn: function() {
    var admin = getAdminCollection(this.params.name);
    if (admin) {
      return _.map(admin.subscriptions, function(filter, name) {
        return Meteor.subscribe('publish', name, filter);
      });
    }
  },
  data: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name),
        cursor, pagination;
    if (collection) {
      cursor = collection.find(params.query, { sort: collection._admin.getOption('sort') });
      pagination = new Pagination(cursor, collection._admin.getOption('list_per_page'));
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
          return pagination.page(params.page > pagination.totalPages() ? pagination.totalPages() : params.page);
        }
      };
    }
  },
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return this.next();
    }
    return this.render('adminSignInForm');
  }
};

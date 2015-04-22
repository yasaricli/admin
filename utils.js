// Returned Collections instance _admin.
Collections = function() {
  return _.filter(Mongo.Collection.getAll(), function(doc) {
      return _.has(doc.instance, '_admin');
  });
};

// all subscriptions Collections list.
allSubscriptions = function() {
  return _.map(Collections(), function(coll) {
    return coll.instance._admin.runSubscriptions();
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
  }
};

IronRouterAdmin = {
  layoutTemplate: 'adminLayout',
  loadingTemplate: 'adminLoading',
  waitOn: function() {
    var admin = getAdminCollection(this.params.name);
    if (admin) { 
      return admin.runSubscriptions();
    }
  },
  data: function() {
    var params = this.params,
        collection = Mongo.Collection.get(params.name),
        cursor = collection.find(params.query, { sort: collection._admin.sort }),
        pagination = new Pagination(cursor, collection._admin.list_per_page);
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
      cursor: function() {
        return cursor;
      },
      pagination: function() {
        return pagination;
      },
      collection: function() {
        return pagination.page(params.page);
      }
    };
  },
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return this.next();
    }
    return this.render('adminSignInForm');
  }
};

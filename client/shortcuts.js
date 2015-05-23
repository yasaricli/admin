var root = this, HELPERS;

// METHODS
root.saveFormHookObject = {
  onSuccess: function(type, _id, view) {
    var collection = root[view.data.collection];
    Router.go('AdminCollection', { name: collection._name });
  }
};

// HELPERS
HELPERS = {
  collections: function() {
    return getAllCollections();
  },

  getCollectionAdmin: function() {
    return this.instance._admin;
  },

  getVal: function(doc) {
    return doc[this.key];
  },

  isBoolean: function() {
    return this.type == 'Boolean';
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
  },

  // XXX: Meteor next version @index @first @last
  setIndex: function(list) {
    return _.map(list, function(doc, index) {
      return _.extend({
        index: index,
        first: index == 0,
        last: index == (list.length -1)
      }, doc);
    });
  },

  // SCHEMAS
  adminSignInForm: new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: "E-mail address"
    },
    password: {
      type: String,
      min: 6,
      label: 'Password',
      autoform: {
        type: 'password'
      }
    }
  })
};

// AUTOFORM HOOKS
AutoForm.hooks({
  insertForm: saveFormHookObject,
  updateForm: saveFormHookObject,
  AdminSignInForm: {
    // XXX ??????? this.done ??
    onSubmit: function(data) {
      this.event.preventDefault();
      Meteor.loginWithPassword(data.email, data.password, function(err) {
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          Session.set('AdminSignInFormError', null);
          return Router.go('AdminDashboard');
        }
        Session.set('AdminSignInFormError', 'Login forbidden');
      });
    }
  }
});

// TEMPLATE PROTOTYPES
Template.prototype.onRenderedFocus = function (cb) {
  this._callbacks.rendered.push(function() {

    // first element focus on render then
    this.find('input').focus();

    // call callback
    cb.call(this);
  });
};

// TEMPLATE REGISTER HELPERS
_.each(HELPERS, function(fn, name) {
  Template.registerHelper(name, fn);
});

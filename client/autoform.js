var root = this,
    Schemas = {};

root.saveFormHookObject = {
  onSuccess: function(type, _id, view) {
    var collection = root[view.data.collection];
    Router.go('AdminCollection', { name: collection._name });
  }
};

// SCHEMAS
Schemas.adminSignInForm = new SimpleSchema({
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
});

// HOOKS
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

// SCHEMAS TEMPLATE REGISTER
Template.registerHelper('Schemas', Schemas);

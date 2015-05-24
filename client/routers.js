// ACCOUNTSTEMPLATES.CONFIGURES
AccountsTemplates.configure({
  enablePasswordChange: true
});

// DASHBOARD ROUTE
Router.route('/admin', _.extend({
  name: 'AdminDashboard',
  waitOn: function() {
    return getAllSubscriptions();
  }
}, _.pick(IronRouterAdmin, ['onBeforeAction', 'layoutTemplate', 'loadingTemplate'])));

// COLLECTION ROUTE
Router.route('/admin/:name', _.extend({ name: 'AdminCollection' }, IronRouterAdmin));

// COLLECTION PAGINATION
Router.route('/admin/:name/page/:page', _.extend({ name: 'AdminCollectionPagination', template: 'adminCollection' }, IronRouterAdmin));

// INSERT ROUTE
Router.route('/admin/:name/insert', _.extend({ name: 'AdminCollectionInsert' }, IronRouterAdmin));

// UPDATE ROUTE
Router.route('/admin/:name/update/:_id', _.extend({ name: 'AdminCollectionUpdate' }, IronRouterAdmin));

// CHANGE PASSWORD ROUTE OVERRIDE
AccountsTemplates.configureRoute('changePwd', {
  layoutTemplate: 'adminLayout',
  path: '/admin-change-password',
  redirect: '/admin'
});

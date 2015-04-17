Router.route('/admin', _.extend({
    layoutTemplate: 'adminLayout',
    name: 'AdminDashboard',
    waitOn: function() {
        return allSubscriptions();
    }
}, _.pick(AdminIronRouterUtils, ['onBeforeAction'])));

Router.route('/admin/:name', _.extend({
    name: 'AdminCollection'
}, AdminIronRouterUtils));

Router.route('/admin/:name/insert', _.extend({
    name: 'AdminCollectionInsert'
}, AdminIronRouterUtils));

Router.route('/admin/:name/update/:_id', _.extend({
    name: 'AdminCollectionUpdate'
}, AdminIronRouterUtils));

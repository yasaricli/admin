// DASHBOARD ROUTE
Router.route('/admin', _.extend({
    name: 'AdminDashboard',
    waitOn: function() {
        return allSubscriptions();
    }
}, _.pick(AdminIronRouter, ['onBeforeAction', 'layoutTemplate'])));

// COLLECTION ROUTE
Router.route('/admin/:name', _.extend({ name: 'AdminCollection' }, AdminIronRouter));

// COLLECTION PAGINATION
Router.route('/admin/:name/page/:page', _.extend({ name: 'AdminCollectionPagination', template: 'adminCollection' }, AdminIronRouter));

// INSERT ROUTE
Router.route('/admin/:name/insert', _.extend({ name: 'AdminCollectionInsert' }, AdminIronRouter));

// UPDATE ROUTE
Router.route('/admin/:name/update/:_id', _.extend({ name: 'AdminCollectionUpdate' }, AdminIronRouter));

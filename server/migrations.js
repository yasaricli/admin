var DefaultAdminUser = {
  email: 'admin@admin.com',
  password: '123456'
};

Migrations.add('createAdminUser', function() {
  var userId = Accounts.createUser(DefaultAdminUser);

  // add roles
  if (userId) {
    Roles.addUsersToRoles(userId, ['admin']);
  }
});

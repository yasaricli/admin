Package.describe({
    name: 'yasaricli:admin',
    version: '0.3.0',
    summary: 'Meteorjs is the basic admin interface.',
    git: 'https://github.com/yasaricli/admin.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1');

    // Utils and base js
    api.addFiles([
      'shortcuts.js',
      'admin.js'
    ]);

    api.addFiles([
      'client/templates.html',
      'client/styles.css',
      'client/shortcuts.js',
      'client/rendered.js',
      'client/events.js',
      'client/helpers.js',
      'client/routers.js'
    ], 'client');

    api.addFiles([
      'server/publications.js'
    ], 'server');

    // Meteor-provided packages
    api.use([
      'accounts-base',
      'accounts-password',
      'mongo',
      'underscore',
      'templating',
      'tracker'
    ], ['client', 'server']);

    // Third-party package dependencies
    api.use([
      'iron:router@1.0.9',
      'zimme:active-route@2.1.0',
      'fortawesome:fontawesome@4.3.0',
      'dburles:mongo-collection-instances@0.3.3',
      'aldeed:collection2@2.3.3',
      'aldeed:autoform@5.3.0',
      'aldeed:delete-button@1.0.0',
      'alanning:roles@1.2.13',
      'ongoworks:security@1.1.0',
      'idmontie:migrations@1.0.0',
      'useraccounts:core@1.11.1',
      'useraccounts:unstyled@1.11.1',
      'yasaricli:admin-styles@0.0.1',
      'yasaricli:kalypto@0.0.4',
      'nooitaf:colors@0.0.2'
    ]);

    // Export Admin Object
    api.export(['SimpleSchema', 'Admin']);
});

Package.describe({
    name: 'yasaricli:admin',
    version: '0.0.2',
    summary: 'Meteorjs is the basic admin interface.',
    git: 'https://github.com/yasaricli/admin.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1');

    // Utils and base js
    api.addFiles('admin.js');

    api.addFiles([
      'client/templates.html',
      'client/styles.css',
      'client/autoform.js',
      'client/rendered.js',
      'client/events.js',
      'client/helpers.js',
      'client/routers.js'
    ], 'client');

    api.addFiles([
      'server/publications.js',
      'server/migrations.js'
    ], 'server');

    // Meteor-provided packages
    api.use([
      'accounts-base',
      'accounts-password',
      'mongo',
      'underscore',
      'templating'
    ], ['client', 'server']);

    // Third-party package dependencies
    api.use([
      'iron:router@1.0.7',
      'zimme:iron-router-active@1.0.4',
      'fortawesome:fontawesome@4.3.0',
      'dburles:mongo-collection-instances@0.3.3',
      'aldeed:collection2@2.3.3',
      'aldeed:autoform@4.2.2 || 5.0.0',
      'alanning:roles@1.2.13',
      'ongoworks:security@1.1.0',
      'idmontie:migrations@1.0.0'
    ]);
});

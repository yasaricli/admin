Package.describe({
    name: 'yasaricli:admin',
    version: '0.0.1',
    summary: 'Meteorjs is the automatic admin interface.',
    git: 'https://github.com/yasaricli/admin.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    var clientAndServer = ['client', 'server'],
        clientFiles, serverFiles, packages;

    // METEOR VERSION
    api.versionsFrom('1.1');

    // CLIENT FILES
    clientFiles = [
      'client/templates.html',
      'client/styles.css',
      'client/autoform.js',
      'client/rendered.js',
      'client/events.js',
      'client/helpers.js',
      'client/routers.js'
    ];

    // SERVER FILES
    serverFiles = [
      'server/publications.js'
    ];

    // ADMIN BASE FILE
    api.addFiles('admin.js');

    // CLIENT AND SERVER FILES ADD FILES
    api.addFiles(clientFiles, 'client');
    api.addFiles(serverFiles, 'server');

    // Meteor-provided packages
    api.use('accounts-base@1.2.0', clientAndServer);
    api.use('accounts-password@1.1.1', clientAndServer);
    api.use('mongo@1.1.0', clientAndServer);
    api.use('underscore@1.0.3', clientAndServer);
    api.use('templating@1.1.1', 'client');

    // Meteor-provided packages
    api.use('iron:router@1.0.7', 'client');
    api.use('zimme:iron-router-active@1.0.4', 'client');
    api.use('fortawesome:fontawesome@4.3.0', 'client');
    api.use('dburles:mongo-collection-instances@0.3.3', clientAndServer);
    api.use('aldeed:collection2@2.3.3', clientAndServer);
    api.use('aldeed:autoform@4.2.2 || 5.0.0', clientAndServer);
    api.use('alanning:roles@1.2.13', clientAndServer);
    api.use('ongoworks:security@1.1.0', clientAndServer);
});

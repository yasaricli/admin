Styles = new Mongo.Collection("styles");

Styles.attachSchema(new SimpleSchema({
    name: {
      type: String
    },
    description: {
      type: String,
      optional: true,
      autoform: {
        type: 'textarea'
      }
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        }
      }
    },
    imageId: {
      type: String,
      label: 'Nes Image',
      autoform: {
        afFieldInput: {
          type: 'fileUpload',
          collection: 'Images'
        }
      }
    },
    active: {
      type: Boolean
    }
}));

Styles.helpers({
  image: function() {
    return Images.findOne(this.imageId);
  }
});

// ADMIN
Styles.attachAdmin({
  name: 'Styles',
  list_display: ['name', 'active'],
  exclude: ['createdAt'],
  sort: { createdAt: -1 },
  security: true,
  list_per_page: 10,
  verbose_name: 'Style',
  subscriptions: {
    'cfs.images.filerecord': {}
  }
});

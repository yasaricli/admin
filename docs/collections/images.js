Images = new FS.Collection("images", {
  stores: [ new FS.Store.GridFS("imagesStore") ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Meteor.publishComposite('styles', {
  find: function() {
    return Styles.find({ });
  },
  children: [
    {
      find: function(style) {
        return Images.find({ _id: style.imageId });
      }
    }
  ]
});

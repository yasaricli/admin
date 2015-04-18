var root = this;

var saveAndGo = {
  onSuccess: function(type, _id, view) {
    var collection = root[view.data.collection];
    Router.go('AdminCollection', { name: collection._name });
  }
}

AutoForm.addHooks('insertForm', saveAndGo);
AutoForm.addHooks('updateForm', saveAndGo);

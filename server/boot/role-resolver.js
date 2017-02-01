module.exports = function(app) {
  var role = app.models.role;

  role.registerResolver('team', function(role, context, cb) {
    if (context.modelName !== 'Category') {
      return process.nextTick(() => cb(null, false));
    }

    var  userId = context.accessToken.userId;
    if (! userId) {
      return process.nextTick(() => cb(null, false));
    }

    context.model.findById(context.modelId, function(err, Category) {
      if(err) return cb(err);
      if(!Category) return cb(new Error("Category not found"));

      //Check if AppUser can access of the Document associated with this Category
      var Document = app.models.Document;
      Document.count({
        categoryId: Category.categoryId
      }, function(err, count) {
        if (err) return cb(err);

        if(count > 0){
          return cb(null, true);
        }else{
          return cb(null, false);
        }
      });
    });
  });
};
module.exports = (app)=> {
  var Role = app.models.Role;

  Role.registerResolver('member', (Role, context, cb)=> {
    if (context.modelName !== 'Category') {
      return process.nextTick(() => cb(null, false));
    }

    var  userId = context.accessToken.userId;
    if (! userId) {
      return process.nextTick(() => cb(null, false));
    }

    context.model.findById(context.modelId, (err, Category)=> {
      if(err) return cb(err);
      if(!Category) return cb(new Error("Category not found"));

      //Check if AppUser can access of the Document associated with this Category
      var AppUser = app.models.AppUser;
      AppUser.count({
        categoryId: Category.categoryId
      }, (err, count)=> {
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
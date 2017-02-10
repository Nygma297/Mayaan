module.exports = (app) => {
  var Role = app.models.Role;

  Role.registerResolver('CategoryMember', (role, context, cb) => {
    var AppUserId = context.accessToken.userId;
    //Check Category
    context.model.findById(context.modelId, (err, Category) => {
      if (err) return cb(err);
      //No Category Found
      if (!Category) return cb(new Error("Category"));

      // Step 2: check if AppUser is part of the Category
      var CategoryGroup = app.models.CategoryGroup;
      var UserGroup = app.models.UserGroup
      UserGroup.find({ where: { "userId": AppUserId } }, (err, Result) => {
        if (err) {
          return cb(err);
        } else {
          CategoryGroup.count({ where: { "groupId": { inq: [Result.groupId] } } }, (err, res) => {
            if (err) return cb(err);
            if (res > 0) {
              // AppUser is associated with the category 
              return cb(null, true);
            } else {
              // AppUser is not associated with the Category
              return cb(null, false);
            }
          });
        };
      });
    });
  });
}
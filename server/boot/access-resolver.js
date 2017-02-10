module.exports = (app)=> {
  var Role = app.models.Role;

  Role.registerResolver('CategoryMember', (role, context, cb)=> {
    // Q: Is the current request accessing a Category?
    if (context.modelName !== 'Category') {
      // A: No. This role is only for Category: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }
  });
};
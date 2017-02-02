module.exports = (app)=> {
  var Role = app.models.Role;

  Role.registerResolver('CategoryMember', (role, context, cb)=> {
    // Q: Is the current request accessing a Document?
    if (context.modelName !== 'Document') {
      // A: No. This role is only for Documents: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }
  });
};
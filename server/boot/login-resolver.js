module.exports = (app)=> {
  var Role = app.models.Role;

  Role.registerResolver('CategoryMember', (role, context, cb)=> {
    //Q: Is the AppUser logged in? (there will be an accessToken with an ID if so)
    var AppUserId = context.accessToken.userId;
    if (!AppUserId) {
      //A: No, AppUser is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }
  });
};
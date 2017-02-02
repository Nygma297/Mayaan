// module.exports = (app)=> {
//   var Role = app.models.Role;

//   Role.registerResolver('CategoryMember', (role, context, cb)=> {
//     // Q: Is the current request accessing a Document?
//     if (context.modelName !== 'Document') {
//       // A: No. This role is only for Documents: callback with FALSE
//       return process.nextTick(() => cb(null, false));
//     }

//     //Q: Is the AppUser logged in? (there will be an accessToken with an ID if so)
//     var AppUserId = context.accessToken.userId;
//     if (!AppUserId) {
//       //A: No, AppUser is NOT logged in: callback with FALSE
//       return process.nextTick(() => cb(null, false));
//     }

    // Q: Is the current logged-in AppUser associated with this Document?
    // Step 1: lookup the requested Document
    context.model.findById(context.modelId, (err, Document)=> {
      // A: The datastore produced an error! Pass error to callback
      if(err) return cb(err);
      // A: There's no Document by this ID! Pass error to callback
      if(!Category) return cb(new Error("Document"));

      // Step 2: check if AppUser is part of the Category associated with this Document
      // (using count() because we only want to know if such a record exists)
      var Category = app.models.Category;
      Category.count({
        ownerId: Document.ownerId,
        memberId: AppUserId
      }, (err, count)=> {
        // A: The datastore produced an error! Pass error to callback
        if (err) return cb(err);

        if(count > 0){
          // A: YES. At least one Category associated with this AppUser AND Document
          // callback with TRUE, AppUser is associated to:`CategoryMember`
          return cb(null, true);
        }

		else{
          // A: NO, AppUser is not in this Document's Category
          // callback with FALSE, AppUser is NOT associated to:`CategoryMember`
          return cb(null, false);
        }
      });
    });
  });
};
// module.exports = function(app) {
//   var Role = app.models.Role;

//   Role.registerResolver('', function(role, context, cb) {
//     function reject() {
//       process.nextTick(function() {
//         cb(null, false);
//       });
//     }

//     if (context.modelName !== 'document') {
//       return reject();
//     }

//     var userId = context.accessToken.userId;
//     if (!userId) {
//       return reject();
//     }

//     //user is in category table for the given document
//     context.model.findById(context.modelId, function(err, document) {
//       if (err || !document)
//         return reject();

//       var userGroup = app.models.userGroup;
//     });
//   });
// };
module.exports = (app) => {
	var Role = app.models.Role;

	Role.registerResolver('User', (role, context, cb) => {
		var AppUserId = context.accessToken.userId;
		//Check Document
		context.model.findById(context.modelId, (err, Document) => {
			if (err) return cb(err);
			//no Document Found
			if (!Document) return cb(new Error("Document"));

			// Step 2: check if AppUser is part of the Category associated with this Document
			var CategoryGroup = app.models.CategoryGroup;
			var UserGroup = app.models.UserGroup;
			var UserGroup = app.models.Document;
			UserGroup.find({ where: { "userId": AppUserId } }, (err, Result) => {
				if (err) {
					return cb(err);
				} else {
					CategoryGroup.find({ where: { "groupId": { inq: [Result.groupId] } } }, (err, res) => {
						if (err) {
							return cb(err);
						} else {
							Document.find({ where: { "categoryId": { inq: [Result.categoryId] } } }, (err, res) => {
								if (err) return cb(err);
								if (res > 0) {
									// At least one Category associated with this AppUser 
									return cb(null, true);
								} else {
									// AppUser is not in this Document's Category
									return cb(null, false);
								}
							});
						}
					})
				};
			});
		});
	});
}
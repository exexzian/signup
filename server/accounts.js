console.log("hello from the server");
Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;
	console.log("Creating User");
	return user;
});
/*
 *somthing like this will be needed when the 'autopublish' package is removed
 *
Meteor.publish('user', function () {
    return Meteor.users.find({_id: this.userId }, {
        fields: {
            profile: 1,
            emails: 1
        }
    });
});
*/

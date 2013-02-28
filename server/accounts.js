console.log("hello");
Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;
	console.log("Creating User");
	return user;
});

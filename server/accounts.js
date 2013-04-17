console.log("hello from the server");
Meteor.startup(function () {
	process.env.MAIL_URL = "smtp://postmaster%40wrt.mailgun.org:67wo9jjqclj3@smtp.mailgun.org:587";
});
Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
Accounts.emailTemplates.siteName = "Simple Signup";
Accounts.emailTemplates.from = "Simple Signup <admin@wrt.mailgun.org>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
	return "Welcome to the Simple Signup Experiment " + user.profile.name;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
	return "Thanks for signing up and testing this experiment \n" +
		"Click the link below to activate your account \n \n" + 
		url +
		"\n \n I hope your email adress gets activated, this is afterall an experiment :)";
};
Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;
	console.log("Creating User");
	//console.log(JSON.stringify(user.profile));
	//console.log(user.profile);
	console.log(JSON.stringify(user));
	//console.log(user);
	console.log("user._id: " + user._id);
	console.log("user.emails[0].address: " + user.emails[0].address);
	//Accounts.sendVerificationEmail(user._id, user.emails[0].address);
	return user;
});

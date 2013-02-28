Template.user_loggedout.events({
	"click #login": function (e, tmpl) {
		console.log("clicked login");
	    var username = "schofld";
	    var email = "d.schofld@gmail.com";
    	var password = "testpassword";
		Meteor.loginWithPassword(username, password);
	}
});

Template.user_loggedout.events({
	"click #signup": function (e, tmpl) {
		console.log("clicked signup");
		Accounts.createUser({username: "schofld", email: "d.schofld@gmail.com", password: "testpassword"});
	}
});

Template.user_loggedin.events({
	"click #logout": function (e, tmpl) {
		Meteor.logout()
	}
});

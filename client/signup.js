Template.user_loggedout.events({
	"click #login": function (e, tmpl) {
		console.log("clicked login");
		Meteor.loginWithPassword({username: "schofld", email: "d.schofld@gmail.com", password: "testpassword"}, function (err) {
				console.log(err);
			}
		)
	}
});
Template.user_loggedin.events({
	"click #logout": function (e, tmpl) {
		Meteor.logout()
	}
});

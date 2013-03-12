// functions that can be reused 
function login () {
	var username = $("#username").val();
	var password = $("#password").val();
	Meteor.loginWithPassword(username, password);
}

//run function when the dependencies change. 
//PROBLEM seams to run every time Meteor.userId() is called not sure though. I basically just know that i runs to damned often 
Meteor.autorun(function () {
	// set session "signup" to false to remove the signup form when you log out
	if (Meteor.userId()) {
		console.log("sesion signup is set to 'false' because user is signed in");
		Session.set("signup", false);
	}
});

// if the user is logged out
// All the events that are bound to 'user_loggedout'
Template.user_loggedout.events({
	"click #login": function (e, tmpl) {
		console.log("clicked login");
		// login() function just to reuse the snippet of code 
		login();
	},
	"keyup #password": function (event) {
		if (event.type == "keyup" && event.which == 13) {
			console.log("keyup identified enter was pressed");
			login();
		}
	},
	"click #signup": function (e, tmpl) {
		console.log("clicked signup");
		Session.set("signup", true);
		console.log(Session.get("signup"));
	},
	"click #createUser": function (e, tmpl) {
		console.log("clicked Create User BTN");
		// get the values form the input elements 
		var username = $("#usernameup").val();
		var password = $("#passwordup").val();
		var favcolor = $("#favcolor").val();
		var location = $("#location").val();

		console.log(username + " : " + password + " : " + favcolor + " : " + location);

		Accounts.createUser({username: username, password: password, profile: {favcolor: favcolor, location: location}});
	}
});

Template.user_loggedin.curuser = function () {
	return Meteor.users.find({_id: Meteor.userId()});
}

// return to handlebars #if helper true or false to reveal or hide the signup form
Template.user_loggedout.signup = function () {
	if (Session.get("signup")) {
		console.log("session signup is 'true'");
		return true
	}
	else {
		console.log("session signup is 'false'");
		return false
	}
}
// if the user is logged in
Template.user_loggedin.events({
	"click #logout": function (e, tmpl) {
		Meteor.logout()
	},
	"click #update": function (event) {
		var mybio = $("#bio").val();
		console.log("This is the val from the bio input: " + mybio);
		//a snipet for use in 
		//Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.bio": "diferent"}})
		  Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.bio": mybio}})
	}
});

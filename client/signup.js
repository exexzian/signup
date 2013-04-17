var LoginErr, createUserError;
// functions that can be reused
function login () {
	var username = $("#usernameLogin").val();
	var password = $("#passwordLogin").val();
	Meteor.loginWithPassword(username, password, function (error){
		if (error) {
			if (LoginErr == 1) {
				//console.log("LoginErr is greater then or equal to 1");
				//$("#mainDiv p:first span").addClass("label-warning");
				$("#mainDiv div.alert").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				LoginErr = LoginErr + 1;
			} else if (LoginErr >= 2) {
				//$("#mainDiv p:first span").removeClass("label-warning").addClass("label-important");
				$("#mainDiv div.alert").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				LoginErr = LoginErr + 1;
			}
			else {
				$("#mainDiv p:first").remove();
				$("form#loginForm").before("<div class='alert alert-error'>Wrong username or password!</div>");
				LoginErr = 1;
			}
			$("#login").button('reset');
		}
	});
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

Meteor.loggingIn();
// check if the user has logged in previously and the server is waiting for a reply
if (Meteor.userId() && Meteor.status().status == "connecting"){
	var once = true;
	Template.main.rendered = function() {
		if (once) {
			once = false;
			console.log("logged in Waiting for reply");
			$(function() {
				$("#loginAlert").modal("show");
			});
		};
	};
} 

// if the user is logged out
// All the events that are bound to 'user_loggedout'
Template.user_loggedout.events({
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
	}
});
// Verify email address
/*
Meteor.startup(function () {
if (Accounts._verifyEmailToken) {
	console.log("_verifyEmailToken exists");
	Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {
	Accounts._enableAutoLogin();
	if (!error)
		//loginButtonsSession.set('justVerifiedEmail', true);
		console.log("their was no error verifying the email");
	// XXX show something if there was an error.
	});
}

});
*/

// function for creating user account... Run if the form is valid
function createUserAccount () {
	console.log("INIT create user account ");
	
	// get the values form the input elements 
	var username = $("#usernameSignup").val();
	var password = $("#passwordSignup").val();
	var favcolor = $("#favcolor").val();
	var location = $("#location").val();
	var email = $("#email").val();

	console.log(username + " : " + password + " : " + email + " : " + favcolor + " : " + location);

	Accounts.createUser({username: username, password: password, email: email, profile: {favcolor: favcolor, location: location}}, function(error) {
		if (error) {
			console.log(error);
			//$("#signupForm div .alert").remove();
			$("#createUser").button('reset');
			if (createUserError >= 1) {
				$("#mainDiv div.alert:first").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
			} else {
				$("form#signupForm").before("<div class='alert alert-error'>" + error.reason + "</div>");
				createUserError = 1;
			}
		}
	});
	
};

Template.user_loggedin.curuser = function () {
	return Meteor.users.find({_id: Meteor.userId()});
}
// hide the login alert HERE because this is where the user_loggedin template is called if logged in
Template.user_loggedin.created = function () {
	console.log("hide LoggingIn alert");
	$(function() {
		$("#loginAlert").modal("hide");
	});
};

// return to handlebars #if helper true or false to reveal or hide the signup form
Template.user_loggedout.signup = function () {
	if (Session.get("signup")) {
		return true
	}
	else {
		return false
	}
}
Template.header.signup = function () {
	if (Session.get("signup")) {
		return true
	}
	else {
		return false
	}
}
Template.user_loggedin.editMode = function () {
	if (Session.get("editMode")) {
		return true
	} else {
		return false
	}
}
Template.profileData.editMode = function () {
	if (Session.get("editMode")) {
		return true
	} else {
		return false
	}
}


// if the user is logged in
Template.user_loggedin.events({
	"click #logout": function (e, tmpl) {
		Meteor.logout()
	},
	"click #editProfile": function (event) {
		console.log("Edit Profile PRESSED");
		Session.set("editMode", true);
		console.log(Session.get("editMode"));
	},
	"click #saveEdit": function (event) {
		console.log("Save Edit PRESSED");
		var favcolor = $("#favcolor").val();
		var location = $("#location").val();
		var bio = $("#bio").val();
	
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.favcolor": favcolor, "profile.location": location, "profile.bio": bio}});
		Session.set("editMode", false);
	}
});

// initiate validate when Template is rendered 
Template.user_loggedout.rendered = function () {
	if (Session.get("signup")) {
		console.log("validate: " + signupForm);
		myValidation (signupRules, signupMessages, signupForm, signupPlacement, signupHandleSubmit);
	} else {
		console.log("validate: " + loginForm);
		myValidation (loginRules, loginMessages, loginForm, loginPlacement, loginHandleSubmit);
	}
}


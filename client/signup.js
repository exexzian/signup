// functions that can be reused 
var LoginErr, inputValid;
function login () {
	var username = $("#username").val();
	var password = $("#password").val();
	Meteor.loginWithPassword(username, password, function (error){
		if (error) {
			if (LoginErr == 1) {
				//console.log("LoginErr is greater then or equal to 1");
				$("#mainDiv p:first span").addClass("label-warning");
				//console.log("Before: " + LoginErr);
				LoginErr = LoginErr + 1;
				//console.log("After: " + LoginErr);
			} else if (LoginErr >= 2) {
				$("#mainDiv p:first span").removeClass("label-warning").addClass("label-important");
				LoginErr = LoginErr + 1;
			}
			else {
				$("#mainDiv p:first").append("<span class='label'>Try again</span>");
				LoginErr = 1;
			}
			$("#login i").remove();
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
				//$("#mainDiv").prepend("<div id='alertLoggingIn' class='alert'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Logging In!</strong> Waiting for the response from the server</div>");
				$("#loginAlert").modal("show");
			});
		};
	};
} 

// initiate validate when Template is rendered 
Template.user_loggedout.rendered = function () {
	$("input").not("[type=submit]").jqBootstrapValidation();
	$("form").submit(function (event) {
		event.preventDefault();
	});
	$("form").jqBootstrapValidation ({
		submitSuccess: function($form, event) {
			event.preventDefault();
			inputValid = true;
			console.log("set inputValid to true");
/*
			console.log("clicked Create User BTN when VALID");
			// get the values form the input elements 
			var username = $("#usernameup").val();
			var password = $("#passwordup").val();
			var favcolor = $("#favcolor").val();
			var location = $("#location").val();
			var email = $("#emailup").val();

			console.log(username + " : " + password + " : " + email + " : " + favcolor + " : " + location);

			Accounts.createUser({username: username, password: password, email: email, profile: {favcolor: favcolor, location: location}});
*/
		}
	});

}

// if the user is logged out
// All the events that are bound to 'user_loggedout'
Template.user_loggedout.events({
	"click #login": function (e, tmpl) {
		console.log("clicked login");
		$("#login").prepend("<i class='icon-refresh icon-spin'></i>");
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
		if (inputValid) {
			console.log("clicked Create User BTN");
			// get the values form the input elements 
			var username = $("#usernameup").val();
			var password = $("#passwordup").val();
			var favcolor = $("#favcolor").val();
			var location = $("#location").val();
			var email = $("#emailup").val();

			console.log(username + " : " + password + " : " + email + " : " + favcolor + " : " + location);

			Accounts.createUser({username: username, password: password, email: email, profile: {favcolor: favcolor, location: location}});
		}
	}

});

Template.user_loggedin.curuser = function () {
	return Meteor.users.find({_id: Meteor.userId()});
}
// hide the login alert HERE because this is where the user_loggedin template is called if logged in
Template.user_loggedin.created = function () {
	console.log("hide LoggingIn alert");
	$(function() {
		//$("#alertLoggingIn").fadeOut("fast");
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

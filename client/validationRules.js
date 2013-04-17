// Signup Validation Rules

var signupRules = {
	rules: {
		usernameSignup: {
			required: true,
			alphanumeric: true,
			minlength: 2
		},
		email: {
			required: true,
			email: true
		},
		passwordSignup: {
			required: true
		},
		password_againSignup: {
			required: true,
			equalTo: "#passwordSignup",
			minlength: 3,
			maxlength: 12
		}, 
		favcolor: {
			required: true,
			regex: /^[\s\w\-\d\r\n\t\.]+$/,
			minlength: 3,
			maxlength: 20
		},
		location: {
			required: true,
			regex: /^[\s\w\-\d\r\n\t\.]+$/,
			minlength: 3,
			maxlength: 20
		}

	}
};
var signupMessages = {
	messages: {
		usernameSignup: {
			required: "<strong>Note!</strong> required *",
			alphanumeric: "Must be alphanumerical",
			minlength: "must be at least 2 chars"
		},
		email: {
			required: "We need your email adress to contact you",
			email: "Your email must be in the format of name@domain.com"
		},
		password_againSignup: {
			required: "Retype your password",
			equalTo: "The passwords have to match",
			minlength: "At least 3 chars!",
			maxlength: "No longer then 12 chars!"
		},
		favcolor: {
			required: "What is your favourite color?",
			regex: "Only words and spaces!",
			minlength: "At least 3 char!",
			maxlength: "no longer then 20 chars!"
		},
		location: {
			required: "Where are you?",
			regex: "Only words and spaces!",
			minlength: "At least 3 char!",
			maxlength: "no longer then 20 chars!"
		}
	}
};

var signupForm = "#signupForm";

var signupPlacement = {
	onkeyup: false,
	debug: true,
	errorElement: "div",
	success: function(label) {
		label.html("<strong>Ok!</strong>");
		label.parent("div.alert").removeClass("alert-info alert-error").addClass("alert-success");
	},
	errorPlacement: function(error, element) {
		console.log("error placement was fired");
		console.log(element.parent().children("div.alert").length);
		if (element.parent().children("div.alert").length < 1) {
			console.log("their is no div.alert length < 1");
			element.parent().append("<div class='alert alert-error'></div>");
			element.next("div.alert").html(error);
		} else {
			console.log("div.alert exists");
			element.next("div.alert").html(error);
		}
	},
	highlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-info alert-success").addClass("alert-error");
	},
	unhighlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-error alert-info").addClass("alert-success");
	}
};

var signupHandleSubmit = {
	submitHandler: function () {
		$("#createUser").button('loading');
		createUserAccount();
		return false;
	}
};

// END signup validation rules
//
// START signin rules
var loginRules = {
	rules: {
		usernameLogin: {
			required: true,
			alphanumeric: true,
			minlength: 2
		},
		passwordLogin: {
			required: true,
			minlength: 2
		}
	}
};
var loginMessages = {
	messages: {
		usernameLogin: {
			required: "<strong>Note!</strong> required",
			alphanumeric: "Must be alphanumerical",
			minlength: "must be at least 2 chars"
		}, 
		passwordLogin: {
			required: "<strong>Note!</strong> required",
			minlength: "Must be at least 2 chars"
		}
	}
};
var loginForm = "#loginForm"
var loginPlacement = {
	onkeyup: false,
	debug: true,
	errorElement: "div",
	success: function(label) {
		label.html("<strong>Ok!</strong>");
		label.parent("div.alert").removeClass("alert-info alert-error").addClass("alert-success");
	},
	errorPlacement: function(error, element) {
		console.log("error placement was fired");
		console.log(element.parent().children("div.alert").length);
		if (element.parent().children("div.alert").length < 1) {
			console.log("their is no div.alert length < 1");
			element.parent().append("<div class='alert alert-error'></div>");
			element.next("div.alert").html(error);
		} else {
			console.log("div.alert exists");
			element.next("div.alert").html(error);
		}
	},
	highlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-info alert-success").addClass("alert-error");
	},
	unhighlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-error alert-info").addClass("alert-success");
	}
};
var loginHandleSubmit = {
	submitHandler: function () {
		$("#login").button('loading');
		$("#loginForm div .alert").remove();
		login();
		return false;
	}
};
// END signin rules

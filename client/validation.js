$(function () { 
	$.validator.addMethod(
		"regex",
		function (value, element, regexp) {
			var re = new RegExp(regexp);
			console.log("value: " + value);
			console.log(re.test(value));
			return this.optional(element) || re.test(value);
		},
		"illegal characters"
	);
});

function myValidation () {
	$(function() {
		console.log("Validation is active!");
		$("#signupForm").validate({
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
			},
			rules: {
				username: {
					required: true,
					alphanumeric: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				password: {
					required: true
				},
				password_again: {
					required: true,
					equalTo: "#password"
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

			},
			messages: {
				username: {
					required: "<strong>Note!</strong> required *",
					alphanumeric: "Must be alphanumerical",
					minlength: "must be at least 2 chars"
				},
				email: {
					required: "We need your email adress to contact you",
					email: "Your email must be in the format of name@domain.com"
				},
				password_again: {
					required: "Retype your password",
					equalTo: "The passwords have to match"
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
			},
			submitHandler: function (form) {
				createUserAccount();
				return false;
			}
		});
		
		$("#signupForm").keyup(function() {
			console.log("KEYUP in signupForm was fired");
			$(":focus", this).valid();
		});
	});
};

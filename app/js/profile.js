var Profile = function () {
    
    return {
        //main function to initiate the module
        init: function () {       	
	        $('#profile_form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                username: {
	                    required: true
	                },
	                firstName: {
	                    required: true
	                },
	                lastName: {
	                	required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                paypal: {
	                    required: true,
	                    email: true
	                },
	                payza: {
	                    required: false,
	                    email: true
	                },
	                password: {
	                    required: true
	                }
	            },

	           highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	            	error.addClass('help-small no-left-padding').insertAfter(element.closest('.controls'));
	            },

	            submitHandler: function (form) {
	            	form.submit();
	            }
	        });
	        
	        $('#change_password_form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                password: {
	                    required: true
	                },
	                npassword: {
	                	required: true
	                },
	                rpassword: {
	                    equalTo: "#new_password"
	                }
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	            	error.addClass('help-small no-left-padding').insertAfter(element.closest('.controls'));
	            },

	            submitHandler: function (form) {
	            	form.submit();
	            }
	        });
	        
	        $('#remove_account_form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                password: {
	                    required: true
	                }
	            },
	            
	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	            	error.addClass('help-small no-left-padding').insertAfter(element.closest('.controls'));
	            },

	            submitHandler: function (form) {
	            	bootbox.setLocale("en_US");  
	            	bootbox.confirm("Are you sure to remove your account?", function (result) {  
	                    if(result) {  
	                    	form.submit();
	                    } else {  
	                        return;
	                    }  
	                });	            	
	            }
	        });	        
        }
    };

}();
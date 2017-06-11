var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
        	$('#contact_form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	            	sender: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                content: {
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
        }
    };

}();
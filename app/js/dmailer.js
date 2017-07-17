var DMailer = function() {
	
	return {
		init: function () {
			var editor = $('.wysihtml5').wysihtml5({			  
			    "html": true, //Button which allows you to edit the generated HTML. Default false			  
			    "color": true
			});
			editor.on("load", function() {
				  editor.focus();
				  editor.composer.commands.exec("insertHTML","<a href=....>text</a>");
				});
			
			$(".form_meridian_datetime").datetimepicker({
				format : "mm/dd/yyyy hh:ii",
				showMeridian : true,
				autoclose : true,
				pickerPosition : (App.isRTL() ? "bottom-right" : "bottom-left"),
				todayBtn : true
			});
        },
        
        add : function () {
			var subject = $.trim($('#modal_subject').val());
			var content = $.trim($('#modal_content').val());
			var startTime = $.trim($('#modal_start_time').val());
			if(subject == ""){
				bootbox.alert("Please input mail subject.");
				return;
			}else if(content == ""){
				bootbox.alert("Please input mail content.");
				return;
			}
			$.ajax({
				type : "post",
				data : {
					subject : subject,
					content : content,					
					startTime : startTime,
				},
				url : "rest/page/addMail",
				success : function(info) {
					$('#portlet-config').modal('hide');
					bootbox.alert({ 
			            message: 'Your mail setup sucessfully.',  
			            callback: function() {  
			            	window.location.replace(window.location.href);
			            },  
			            title: "Congratulations",  
			        }); 
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		delete : function (id) {			
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/page/deleteMail",
				success : function(info) {		
					bootbox.alert({ 
			            message: 'Delete sucessfully.',  
			            callback: function() {  
			            	window.location.replace(window.location.href);
			            },  
			            title: "Congratulations",  
			        }); 
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		resend : function (id) {			
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/page/resendMail",
				success : function(info) {
					bootbox.alert({ 
			            message: 'Your mail setup sucessfully.',  
			            callback: function() {  
			            	window.location.replace(window.location.href);
			            },  
			            title: "Congratulations",  
			        });
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		}
	};
}();

